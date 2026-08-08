const INK = "rgba(15,15,17,";
const MONO = "IBM Plex Mono, monospace";
const DEEP = "var(--color-signal-deep)";

const inbound = [
  { label: "ACCOUNTS & ERP", y: 26, lineY: 22, dur: "2.6s" },
  { label: "EMAIL & CHAT", y: 62, lineY: 58, dur: "2.2s" },
  { label: "CRM & HELPDESK", y: 98, lineY: 94, dur: "3s" },
  { label: "FILES & DATABASES", y: 134, lineY: 130, dur: "2.4s" },
];

const groups = [
  {
    heading: "Accounts & ERP",
    tools: [
      "Tally",
      "Zoho Books",
      "SAP",
      "Oracle NetSuite",
      "MS Dynamics",
      "Busy",
      "Marg",
      "Odoo",
    ],
  },
  {
    heading: "Work & communication",
    tools: [
      "Google Workspace",
      "Microsoft 365",
      "Outlook",
      "Gmail",
      "WhatsApp Business",
      "Slack",
      "Teams",
      "IVR & telephony",
    ],
  },
  {
    heading: "Sales & service",
    tools: [
      "Salesforce",
      "HubSpot",
      "Zoho CRM",
      "LeadSquared",
      "Freshdesk",
      "Zendesk",
      "Interakt",
      "Calendly",
    ],
  },
  {
    heading: "Operations & data",
    tools: [
      "Shopify",
      "WooCommerce",
      "Unicommerce",
      "Razorpay",
      "SQL & Postgres",
      "Google Sheets",
      "SharePoint",
      "Drive & S3",
    ],
  },
];

/** Existing tools feed one connection layer, which writes back and logs. */
function ConnectionDiagram() {
  return (
    <svg viewBox="0 0 900 150" className="mt-9 block h-auto w-full" aria-hidden>
      {inbound.map((row) => (
        <g key={row.label}>
          <text x="4" y={row.y} fontFamily={MONO} fontSize="10" fill={`${INK}0.45)`}>
            {row.label}
          </text>
          <line
            x1="150"
            y1={row.lineY}
            x2="330"
            y2={row.lineY}
            stroke={DEEP}
            strokeDasharray="7 6"
            style={{ animation: `dc-march ${row.dur} linear infinite` }}
          />
        </g>
      ))}

      <line x1="336" y1="14" x2="336" y2="138" stroke={`${INK}0.35)`} />
      <text x="346" y="12" fontFamily={MONO} fontSize="10" fill={`${INK}0.45)`}>
        ONE CONNECTION LAYER
      </text>

      <line
        x1="336"
        y1="76"
        x2="428"
        y2="76"
        stroke={DEEP}
        strokeWidth="1.5"
        strokeDasharray="8 7"
        style={{ animation: "dc-march 2.2s linear infinite" }}
      />
      <rect x="430" y="60" width="34" height="34" fill={DEEP} />
      <rect
        x="430"
        y="60"
        width="34"
        height="34"
        fill="none"
        stroke={DEEP}
        style={{
          transformOrigin: "447px 77px",
          animation: "dc-ring 3s ease-out infinite",
        }}
      />
      <text x="447" y="118" textAnchor="middle" fontFamily={MONO} fontSize="10" fill={DEEP}>
        THE SYSTEM
      </text>

      <path
        d="M466 70 H 520 L 540 34"
        fill="none"
        stroke={`${INK}0.3)`}
        strokeDasharray="5 5"
        style={{ animation: "dc-march 3.4s linear infinite" }}
      />
      <path
        d="M466 84 H 520 L 540 118"
        fill="none"
        stroke={`${INK}0.3)`}
        strokeDasharray="5 5"
        style={{ animation: "dc-march 3.8s linear infinite" }}
      />
      <text x="552" y="38" fontFamily={MONO} fontSize="10" fill={`${INK}0.55)`}>
        WRITES BACK INTO YOUR TOOLS
      </text>
      <text x="552" y="122" fontFamily={MONO} fontSize="10" fill={`${INK}0.55)`}>
        FULL RECORD OF WHAT IT DID
      </text>
    </svg>
  );
}

export function HomeConnects() {
  return (
    <section
      className="dc-light dc-divide"
      style={{ ["--dc-bg" as string]: "var(--color-surface-3)" }}
    >
      <div className="dc-pad pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">05 / Connects to</p>
        <h2 className="dc-h2 mt-6 max-w-[17ch]">It plugs into what you already run.</h2>
        <p
          className="mt-6 max-w-[62ch] text-[19px] leading-[1.45]"
          style={{ color: "var(--dc-muted)" }}
        >
          Nothing gets ripped out. The system reads from and writes to the tools your team
          already uses, so the people doing the work carry on as normal. If something is
          old, offline or built in-house, we connect to that too.
        </p>
        <ConnectionDiagram />
      </div>

      <div
        className="dc-panels mt-12 border-t min-[561px]:grid-cols-2 min-[1181px]:grid-cols-4"
        style={{ borderColor: "var(--dc-line)" }}
      >
        {groups.map((group) => (
          <div key={group.heading} className="dc-pad flex flex-col gap-4 py-8">
            <p className="dc-label-muted" style={{ color: DEEP }}>
              {group.heading}
            </p>
            <ul className="flex flex-wrap gap-2">
              {group.tools.map((tool) => (
                <li
                  key={tool}
                  className="dc-mono whitespace-nowrap border px-3 py-2 text-xs"
                  style={{
                    borderColor: `${INK}0.2)`,
                    background: "rgba(255,255,255,0.4)",
                  }}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="dc-pad grid gap-12 pb-[clamp(52px,6vw,76px)] pt-9 min-[861px]:grid-cols-2">
        <p className="text-[16px] leading-[1.55]" style={{ color: `${INK}0.68)` }}>
          <span className="font-semibold" style={{ color: "var(--color-surface-ink)" }}>
            And the awkward ones.
          </span>{" "}
          A scanner in the back office, an IMAP mailbox nobody has cleaned since 2019, an
          on-premise database, an FTP drop from a supplier, or one person emailing a
          spreadsheet every Monday. All of these are normal inputs.
        </p>
        <p className="text-[16px] leading-[1.55]" style={{ color: `${INK}0.68)` }}>
          <span className="font-semibold" style={{ color: "var(--color-surface-ink)" }}>
            And your own software.
          </span>{" "}
          If you have built something in-house, we connect through its API, its database,
          or its exports — whichever is safest. Access is read-only until you decide
          otherwise, and every write is logged.
        </p>
      </div>
    </section>
  );
}
