import { asRecord } from './webhook';

export type MappedMetaLead = {
  externalId: string | null;
  name: string;
  email: string;
  phoneRaw: string;
  business: string;
  enquiry: string;
  platform: string;
  raw: Record<string, unknown>;
};

const normKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/** Graph field_data, a CSV row, or any name/value bag. Unknown names stay in raw. */
export function mapMetaFields(fields: Record<string, string>, meta: Record<string, unknown> = {}): MappedMetaLead {
  const entries = Object.entries(fields).map(([key, value]) => ({
    key,
    norm: normKey(key),
    value: value.trim(),
  })).filter((entry) => entry.value);

  const pick = (...preds: Array<(norm: string) => boolean>) => {
    for (const pred of preds) {
      const hit = entries.find((entry) => pred(entry.norm));
      if (hit) return hit.value;
    }
    return '';
  };

  const phoneRaw = pick(
    (norm) => norm === 'phone number' || norm === 'phone' || norm === 'mobile' || norm === 'mobile number',
    (norm) => norm.includes('phone') || norm.includes('mobile'),
  ).replace(/^p:/i, '');

  const email = pick(
    (norm) => norm === 'email address' || norm === 'email',
    (norm) => norm.includes('email'),
  );

  const name = pick(
    (norm) => norm === 'first name' || norm === 'full name' || norm === 'name',
    (norm) => norm === 'first name' || (norm.includes('name') && !norm.includes('business') && !norm.includes('campaign') && !norm.includes('form') && !norm.includes('ad')),
  );

  const business = pick(
    (norm) => norm.includes('business') || norm.includes('company') || norm.includes('core purpose'),
  );

  const siteNeeds = pick(
    (norm) => norm.includes('site needs') || norm.includes('needs to') || norm.includes('enquiry') || norm === 'goal',
  );

  const used = new Set([phoneRaw, email, name, business, siteNeeds].filter(Boolean));
  const extras = entries
    .filter((entry) => !used.has(entry.value) && !entry.norm.includes('email') && !entry.norm.includes('phone'))
    .map((entry) => `${entry.key}: ${entry.value}`);

  const enquiry = [siteNeeds, ...extras].filter(Boolean).join('\n').slice(0, 4000);
  const platform = String(meta.platform ?? fields.platform ?? '');
  const externalId = String(meta.id ?? meta.leadgen_id ?? fields.id ?? fields.lead_id ?? fields.leadgen_id ?? '').trim() || null;

  return {
    externalId,
    name,
    email,
    phoneRaw,
    business,
    enquiry,
    platform,
    raw: { fields, meta },
  };
}

export function metaLeadSource(platform: string): string {
  const value = platform.toLowerCase();
  if (value === 'ig' || value.includes('instagram')) return 'our Instagram form';
  if (value === 'fb' || value.includes('facebook')) return 'our Facebook form';
  return 'our Meta lead form';
}

export function fieldDataToRecord(fieldData: unknown): Record<string, string> {
  const out: Record<string, string> = {};
  if (!Array.isArray(fieldData)) return out;
  for (const item of fieldData) {
    const record = asRecord(item);
    const name = String(record.name ?? '').trim();
    if (!name) continue;
    const values = Array.isArray(record.values) ? record.values.map((value) => String(value)) : [];
    out[name] = values.join(', ').trim();
  }
  return out;
}

export function graphLeadToMapped(payload: unknown): MappedMetaLead {
  const record = asRecord(payload);
  const fields = fieldDataToRecord(record.field_data);
  return mapMetaFields(fields, {
    id: record.id,
    created_time: record.created_time,
    ad_id: record.ad_id,
    ad_name: record.ad_name,
    adset_id: record.adset_id,
    adset_name: record.adset_name,
    campaign_id: record.campaign_id,
    campaign_name: record.campaign_name,
    form_id: record.form_id,
    form_name: record.form_name,
    platform: record.platform,
  });
}

export function extractLeadgenIds(body: unknown): string[] {
  const ids: string[] = [];
  const entries = asRecord(body).entry;
  if (!Array.isArray(entries)) return ids;
  for (const entry of entries) {
    const changes = asRecord(entry).changes;
    if (!Array.isArray(changes)) continue;
    for (const change of changes) {
      const record = asRecord(change);
      if (record.field !== 'leadgen') continue;
      const id = asRecord(record.value).leadgen_id;
      if (id != null && String(id).trim()) ids.push(String(id).trim());
    }
  }
  return ids;
}

export function decodeMetaExport(bytes: Uint8Array): string {
  if (bytes.length >= 2 && bytes[0] === 0xff && bytes[1] === 0xfe) {
    return Buffer.from(bytes.subarray(2)).toString('utf16le');
  }
  if (bytes.length >= 2 && bytes[0] === 0xfe && bytes[1] === 0xff) {
    const swapped = Buffer.alloc(bytes.length - 2);
    for (let i = 2; i + 1 < bytes.length; i += 2) {
      swapped[i - 2] = bytes[i + 1]!;
      swapped[i - 1] = bytes[i]!;
    }
    return swapped.toString('utf16le');
  }
  const text = Buffer.from(bytes).toString('utf8');
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

/** Tab-separated Meta Leads Center export, including quoted cells. */
export function parseTsv(text: string): Record<string, string>[] {
  const source = text.replace(/^\uFEFF/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < source.length; i++) {
    const char = source[i]!;
    if (quoted) {
      if (char === '"') {
        if (source[i + 1] === '"') { cell += '"'; i += 1; }
        else quoted = false;
      } else cell += char;
    } else if (char === '"') quoted = true;
    else if (char === '\t') { row.push(cell); cell = ''; }
    else if (char === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
    else if (char !== '\r') cell += char;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }

  const header = (rows[0] ?? []).map((value) => value.trim());
  return rows.slice(1).filter((cells) => cells.some((value) => value.trim())).map((cells) => {
    const record: Record<string, string> = {};
    header.forEach((key, index) => { if (key) record[key] = (cells[index] ?? '').trim(); });
    return record;
  });
}

export function mapMetaExport(bytes: Uint8Array): MappedMetaLead[] {
  return parseTsv(decodeMetaExport(bytes)).map((row) => mapMetaFields(row, {
    id: row.id || row.lead_id || row.leadgen_id,
    ad_name: row.ad_name,
    adset_name: row.adset_name,
    campaign_name: row.campaign_name,
    form_name: row.form_name,
    platform: row.platform,
  }));
}
