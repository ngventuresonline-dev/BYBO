/**
 * Preview a Meta Leads Center CSV (UTF-16, tab-separated).
 * Prints a count and masked phones. Does not store leads and does not dial.
 *
 *   node --experimental-strip-types --import ./scripts/test-loader.mjs scripts/import-meta-leads.ts leads.csv
 *
 * To insert rows, POST the file to /api/admin/meta-leads with
 * Authorization: Bearer $CRON_SECRET. Imported rows stay skipped_allowlist
 * unless that request passes place_calls=1.
 */
import { readFileSync } from 'node:fs';
import { mapMetaExport } from '../src/lib/instant-call/meta';
import { maskPhone } from '../src/lib/instant-call/mask';
import { normalizePhone } from '../src/lib/instant-call/phone';

const file = process.argv[2];
if (!file || file.startsWith('-')) {
  console.error('Usage: node --experimental-strip-types --import ./scripts/test-loader.mjs scripts/import-meta-leads.ts <file.csv>');
  process.exit(1);
}

const rows = mapMetaExport(readFileSync(file));
const withId = rows.filter((row) => row.externalId);
console.info(`rows=${rows.length} with_id=${withId.length}`);
for (const row of withId) {
  console.info(`${row.externalId} ${maskPhone(normalizePhone(row.phoneRaw)) || 'no-phone'}`);
}
console.info('No leads were stored and nobody was dialled.');
