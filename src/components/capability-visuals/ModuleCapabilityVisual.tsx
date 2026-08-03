"use client";

import { motion } from "framer-motion";

function VisualFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0b]">
      <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
        <span className="font-mono text-[0.48rem] uppercase tracking-[0.14em] text-white/35">
          {label}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success/80" />
          <span className="font-mono text-[0.44rem] uppercase tracking-[0.1em] text-success/80">
            Live
          </span>
        </span>
      </div>
      <div className="relative h-[calc(100%-1.75rem)] p-3 sm:p-4">{children}</div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(176,38,255,0.12),transparent_40%)]" />
    </div>
  );
}

function MultimodalIntakeVisual() {
  const files = [
    { type: "PDF", name: "invoice_0427.pdf", color: "bg-red-500/20 text-red-300" },
    { type: "IMG", name: "delivery_proof.jpg", color: "bg-blue-500/20 text-blue-300" },
    { type: "AUD", name: "call_recording.wav", color: "bg-purple-500/20 text-purple-300" },
    { type: "ZIP", name: "case_bundle.zip", color: "bg-amber-500/20 text-amber-300" },
  ];

  return (
    <VisualFrame label="Intake · controlled channels">
      <div className="flex gap-1.5">
        {["Email", "Upload", "API", "Scan"].map((channel, index) => (
          <span
            key={channel}
            className={`rounded-md px-2 py-1 font-mono text-[0.44rem] uppercase tracking-[0.08em] ${
              index === 1
                ? "bg-signal text-signal-ink"
                : "border border-white/10 text-white/40"
            }`}
          >
            {channel}
          </span>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {files.map((file, index) => (
          <motion.div
            key={file.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.4 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5"
          >
            <div className="flex items-center gap-2">
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[0.42rem] font-bold ${file.color}`}
              >
                {file.type}
              </span>
              <span className="truncate font-mono text-[0.44rem] text-white/55">
                {file.name}
              </span>
            </div>
            <div className="mt-2 flex gap-2">
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.38rem] text-white/30">
                src: upload
              </span>
              <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.38rem] text-white/30">
                q: 98%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="absolute bottom-3 left-3 right-3 origin-left rounded-md border border-signal/25 bg-signal/10 px-3 py-2"
      >
        <p className="font-mono text-[0.42rem] uppercase tracking-[0.1em] text-signal">
          Case #8842 assembled · 4 assets · metadata preserved
        </p>
      </motion.div>
    </VisualFrame>
  );
}

function KnowledgeIngestVisual() {
  const sources = [
    { name: "SharePoint", docs: 842 },
    { name: "Drive", docs: 1204 },
    { name: "CRM", docs: 318 },
    { name: "Confluence", docs: 483 },
  ];

  const pipeline = ["Parse", "Classify", "Index"];

  return (
    <VisualFrame label="Ingestion · approved repositories">
      <div className="flex flex-wrap gap-1.5">
        {sources.map((source, index) => (
          <motion.span
            key={source.name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[0.42rem] text-white/55"
          >
            {source.name}
            <span className="ml-1.5 text-signal">{source.docs}</span>
          </motion.span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-1">
        {pipeline.map((step, index) => (
          <div key={step} className="flex flex-1 items-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.12 }}
              className="flex-1 rounded-md border border-signal/30 bg-signal/10 px-2 py-1.5 text-center"
            >
              <span className="font-mono text-[0.4rem] uppercase tracking-[0.08em] text-signal">
                {step}
              </span>
            </motion.div>
            {index < pipeline.length - 1 && (
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: index * 0.2 }}
                className="mx-0.5 font-mono text-[0.5rem] text-white/25"
              >
                →
              </motion.span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-1.5">
        {[
          { title: "Sales playbook v4.2", tags: ["owner: rev-ops", "access: internal"] },
          { title: "Renewal policy Q3", tags: ["owner: legal", "access: restricted"] },
        ].map((doc, index) => (
          <motion.div
            key={doc.title}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 + index * 0.12 }}
            className="rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-2"
          >
            <p className="font-mono text-[0.44rem] text-cream">{doc.title}</p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.36rem] text-white/35"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="absolute bottom-3 left-3 right-3 font-mono text-[0.42rem] text-white/45"
      >
        2,847 documents indexed · metadata &amp; permissions preserved
      </motion.p>
    </VisualFrame>
  );
}

function ExtractionVisual() {
  const fields = [
    { label: "Vendor", value: "Acme Supplies Ltd", y: "18%" },
    { label: "Invoice #", value: "INV-0427", y: "32%" },
    { label: "Total", value: "₹1,24,800", y: "46%" },
    { label: "Tax", value: "₹18,720", y: "60%" },
  ];

  return (
    <VisualFrame label="Extraction · structured output">
      <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-3">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-2 py-1.5 font-mono text-[0.4rem] text-white/30">
            Source document
          </div>
          <div className="relative p-3">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="mb-2 h-1.5 rounded-full bg-white/10"
                style={{ width: `${70 - index * 8}%` }}
              />
            ))}
            {fields.map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.2 }}
                className="absolute left-3 right-3 rounded border border-signal/40 bg-signal/10"
                style={{ top: field.y }}
              >
                <span className="px-1.5 py-0.5 font-mono text-[0.38rem] text-signal">
                  {field.label}
                </span>
              </motion.div>
            ))}
            <motion.div
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-signal to-transparent"
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.02]">
          <div className="border-b border-white/10 px-2 py-1.5 font-mono text-[0.4rem] text-white/30">
            Extracted fields
          </div>
          <div className="space-y-2 p-2">
            {fields.map((field, index) => (
              <motion.div
                key={field.label}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.15 }}
                className="rounded border border-white/8 bg-black/30 px-2 py-1.5"
              >
                <p className="font-mono text-[0.38rem] text-white/35">{field.label}</p>
                <p className="font-mono text-[0.48rem] text-cream">{field.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

function ValidationVisual() {
  const rows = [
    { field: "Line item qty", po: "120", doc: "120", ok: true },
    { field: "Unit price", po: "₹840", doc: "₹840", ok: true },
    { field: "Delivery date", po: "12 Aug", doc: "12 Aug", ok: true },
    { field: "Tax rate", po: "18%", doc: "15%", ok: false },
  ];

  return (
    <VisualFrame label="Validation · cross-reference">
      <div className="overflow-hidden rounded-lg border border-white/10">
        <div className="grid grid-cols-4 gap-px bg-white/10 px-2 py-1.5 font-mono text-[0.38rem] uppercase tracking-[0.08em] text-white/35">
          <span>Field</span>
          <span>PO</span>
          <span>Document</span>
          <span>Status</span>
        </div>
        {rows.map((row, index) => (
          <motion.div
            key={row.field}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.12 }}
            className={`grid grid-cols-4 gap-px border-t border-white/10 px-2 py-2 font-mono text-[0.42rem] ${
              row.ok ? "bg-white/[0.02]" : "bg-red-500/10"
            }`}
          >
            <span className="text-white/55">{row.field}</span>
            <span className="text-white/70">{row.po}</span>
            <span className={row.ok ? "text-white/70" : "text-red-300"}>{row.doc}</span>
            <span className={row.ok ? "text-success" : "text-red-400"}>
              {row.ok ? "✓ pass" : "✗ mismatch"}
            </span>
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-3 font-mono text-[0.42rem] text-white/45"
      >
        3 of 4 rules passed · 1 exception routed for review
      </motion.p>
    </VisualFrame>
  );
}

function ReviewIntegrationVisual() {
  return (
    <VisualFrame label="Review · exception queue">
      <div className="grid h-full grid-cols-2 gap-3">
        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]">
          <div className="p-2 font-mono text-[0.4rem] text-white/30">Evidence · page 3</div>
          <div className="mx-2 space-y-1.5 pb-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="h-1 rounded bg-white/10"
                style={{ width: `${85 - index * 10}%` }}
              />
            ))}
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="absolute bottom-6 left-4 right-8 rounded border-2 border-red-400/70 bg-red-500/10 p-1"
          >
            <span className="font-mono text-[0.38rem] text-red-300">Tax rate mismatch</span>
          </motion.div>
        </div>

        <div className="flex flex-col rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
          <p className="font-mono text-[0.4rem] uppercase tracking-[0.1em] text-signal">
            Exception #8842-04
          </p>
          <p className="mt-2 text-[0.52rem] leading-4 text-white/55">
            Tax rate 15% on invoice vs 18% on PO. Approve correction or reject.
          </p>
          <div className="mt-auto flex gap-2 pt-4">
            <motion.span
              whileHover={{ scale: 1.02 }}
              className="flex-1 rounded bg-success/20 py-1.5 text-center font-mono text-[0.42rem] text-success"
            >
              Approve
            </motion.span>
            <span className="flex-1 rounded border border-white/15 py-1.5 text-center font-mono text-[0.42rem] text-white/45">
              Reject
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 flex items-center gap-1.5 font-mono text-[0.38rem] text-white/30"
          >
            <span className="h-1 w-1 rounded-full bg-signal signal-pulse" />
            ERP sync ready on approval
          </motion.div>
        </div>
      </div>
    </VisualFrame>
  );
}

function PlatformLayersVisual() {
  const layers = [
    { label: "Experience", width: "88%" },
    { label: "Workflow", width: "76%" },
    { label: "AI capability", width: "64%", accent: true },
    { label: "Data", width: "52%" },
    { label: "Identity & security", width: "40%" },
  ];

  return (
    <VisualFrame label="Platform · architecture layers">
      <div className="flex h-full flex-col justify-center gap-2">
        {layers.map((layer, index) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="mx-auto rounded-lg border px-3 py-2"
            style={{
              width: layer.width,
              borderColor: layer.accent ? "rgba(176,38,255,0.5)" : "rgba(255,255,255,0.1)",
              background: layer.accent ? "rgba(176,38,255,0.12)" : "rgba(255,255,255,0.03)",
            }}
          >
            <span className="font-mono text-[0.44rem] text-white/60">{layer.label}</span>
          </motion.div>
        ))}
      </div>
    </VisualFrame>
  );
}

function AgentToolsVisual() {
  const tools = ["CRM", "Email", "ERP", "Docs", "Slack"];

  return (
    <VisualFrame label="Agent · scoped tools">
      <div className="relative flex h-full items-center justify-center">
        <motion.div
          animate={{
            boxShadow: [
              "0 0 0 rgba(176,38,255,0)",
              "0 0 30px rgba(176,38,255,0.25)",
              "0 0 0 rgba(176,38,255,0)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="flex h-16 w-16 items-center justify-center rounded-2xl border border-signal/50 bg-signal/15"
        >
          <span className="font-mono text-[0.5rem] font-bold text-signal">AGENT</span>
        </motion.div>
        {tools.map((tool, index) => {
          const angle = (index / tools.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 42;
          const y = Math.sin(angle) * 32;
          return (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.08 }}
              className="absolute rounded-lg border border-white/15 bg-white/[0.04] px-2 py-1 font-mono text-[0.42rem] text-white/55"
              style={{ transform: `translate(${x}%, ${y}%)` }}
            >
              {tool}
            </motion.div>
          );
        })}
      </div>
    </VisualFrame>
  );
}

function OrchestrationVisual() {
  const steps = ["Trigger", "Plan", "Execute", "Review", "Complete"];

  return (
    <VisualFrame label="Orchestration · multi-step flow">
      <div className="flex h-full items-center">
        <div className="flex w-full items-center justify-between">
          {steps.map((step, index) => (
            <div key={step} className="relative flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`flex h-8 w-8 items-center justify-center rounded-full border ${
                  index <= 2
                    ? "border-signal bg-signal/20 text-signal"
                    : "border-white/15 text-white/30"
                }`}
              >
                <span className="font-mono text-[0.42rem]">{index + 1}</span>
              </motion.div>
              <span className="mt-1.5 font-mono text-[0.38rem] text-white/40">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function RetrievalVisual() {
  return (
    <VisualFrame label="Retrieval · source-backed answers">
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2.5">
        <div className="flex items-center gap-2 rounded-md border border-white/10 bg-black/30 px-2 py-1.5">
          <span className="text-white/25">⌕</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-[0.44rem] text-white/55"
          >
            renewal commitments Q3 delivery gap
          </motion.span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-3 rounded-md border border-signal/25 bg-signal/5 p-2"
        >
          <p className="text-[0.52rem] leading-4 text-white/70">
            4 commitments need attention. 2 lack delivery owners.
          </p>
          <div className="mt-2 flex flex-wrap gap-1">
            {["CRM-884", "Contract-12", "Plan-Q3"].map((source) => (
              <span
                key={source}
                className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[0.36rem] text-signal"
              >
                {source}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </VisualFrame>
  );
}

function SignalsVisual() {
  return (
    <VisualFrame label="Signals · anomaly detection">
      <div className="flex h-full items-end gap-1 px-2 pb-2">
        {[40, 55, 48, 62, 58, 91, 52, 49].map((height, index) => (
          <motion.div
            key={index}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: index * 0.06, duration: 0.4 }}
            className={`flex-1 rounded-t ${index === 5 ? "bg-signal" : "bg-white/15"}`}
          />
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-3 left-3 font-mono text-[0.42rem] text-signal"
      >
        Anomaly flagged · week 26 · investigate driver
      </motion.p>
    </VisualFrame>
  );
}

function CustomerChatVisual() {
  return (
    <VisualFrame label="Assistance · omnichannel">
      <div className="space-y-2">
        <div className="ml-auto max-w-[78%] rounded-lg rounded-tr-sm bg-white/10 px-2.5 py-1.5 text-[0.52rem] text-white/70">
          Where is order #4821?
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-[85%] rounded-lg rounded-tl-sm border border-signal/25 bg-signal/10 px-2.5 py-1.5"
        >
          <p className="text-[0.52rem] leading-4 text-white/75">
            Out for delivery today. ETA 4–6 PM. Source: logistics API.
          </p>
        </motion.div>
        <div className="flex gap-1 pt-1">
          {["WhatsApp", "Web", "Email"].map((ch) => (
            <span
              key={ch}
              className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[0.36rem] text-white/35"
            >
              {ch}
            </span>
          ))}
        </div>
      </div>
    </VisualFrame>
  );
}

function WorkforceCopilotVisual() {
  return (
    <VisualFrame label="Copilot · inside your apps">
      <div className="grid h-full grid-cols-[1fr_0.85fr] gap-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-2">
          <p className="font-mono text-[0.38rem] uppercase tracking-[0.1em] text-white/30">
            CRM · account view
          </p>
          <p className="mt-2 font-mono text-[0.52rem] font-bold text-cream">Acme Corp</p>
          <div className="mt-2 space-y-1">
            {[
              ["Renewal", "14 Sep · ₹8.4L"],
              ["Open tickets", "2 active"],
              ["Owner", "Priya M."],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between font-mono text-[0.4rem]">
                <span className="text-white/35">{label}</span>
                <span className="text-white/65">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="flex flex-col rounded-lg border border-signal/30 bg-signal/5 p-2"
        >
          <p className="font-mono text-[0.38rem] uppercase tracking-[0.1em] text-signal">
            BYBO copilot
          </p>
          <p className="mt-2 text-[0.48rem] leading-4 text-white/70">
            Renewal in 12 days. Last call noted pricing concern. Suggest follow-up with revised plan.
          </p>
          <div className="mt-auto space-y-1 pt-3">
            {["Draft follow-up", "View policy", "Log activity"].map((action, index) => (
              <motion.span
                key={action}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className="block rounded border border-white/10 bg-black/25 px-2 py-1 font-mono text-[0.38rem] text-white/55"
              >
                {action}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65 }}
        className="absolute bottom-3 left-3 font-mono text-[0.4rem] text-white/40"
      >
        Embedded in CRM · knowledge + context in one pane
      </motion.p>
    </VisualFrame>
  );
}

function RoutingEscalationVisual() {
  const queue = [
    { case: "Refund request", route: "L1 auto", conf: "96%", ok: true },
    { case: "Contract clause", route: "Legal review", conf: "41%", ok: false },
    { case: "Billing dispute", route: "Specialist", conf: "68%", ok: false },
  ];

  return (
    <VisualFrame label="Routing · evidence-backed handoff">
      <div className="space-y-1.5">
        {queue.map((item, index) => (
          <motion.div
            key={item.case}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border px-2.5 py-2 ${
              item.ok ? "border-white/10 bg-white/[0.02]" : "border-signal/30 bg-signal/5"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[0.44rem] text-cream">{item.case}</span>
              <span
                className={`rounded px-1.5 py-0.5 font-mono text-[0.36rem] ${
                  item.ok ? "bg-success/15 text-success" : "bg-signal/15 text-signal"
                }`}
              >
                {item.route}
              </span>
            </div>
            <p className="mt-1 font-mono text-[0.38rem] text-white/35">
              Confidence {item.conf} · handoff brief attached
            </p>
          </motion.div>
        ))}
      </div>
    </VisualFrame>
  );
}

function QualityOptimizationVisual() {
  const metrics = [
    { label: "Accuracy", value: "93%", trend: "+2.1%" },
    { label: "Compliance", value: "98%", trend: "+0.4%" },
    { label: "Resolution", value: "87%", trend: "+3.8%" },
  ];

  return (
    <VisualFrame label="Quality · interaction review">
      <div className="grid grid-cols-3 gap-1.5">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-center"
          >
            <p className="font-mono text-[0.36rem] text-white/35">{metric.label}</p>
            <p className="font-mono text-[0.52rem] font-bold text-cream">{metric.value}</p>
            <p className="font-mono text-[0.34rem] text-success">{metric.trend}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-3 rounded-lg border border-white/10 bg-white/[0.02] p-2"
      >
        <p className="font-mono text-[0.38rem] text-signal">Coaching flag</p>
        <p className="mt-1 text-[0.48rem] leading-4 text-white/55">
          12 interactions missing policy citation · review queue generated
        </p>
      </motion.div>
    </VisualFrame>
  );
}

function ObservabilityVisual() {
  const metrics = [
    { label: "Latency p95", value: "1.2s" },
    { label: "Cost / 1k tasks", value: "₹84" },
    { label: "Eval pass rate", value: "94.2%" },
    { label: "Incidents (7d)", value: "0" },
  ];

  return (
    <VisualFrame label="Observability · production metrics">
      <div className="grid grid-cols-2 gap-2">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="rounded-lg border border-white/10 bg-white/[0.03] p-2"
          >
            <p className="font-mono text-[0.38rem] text-white/35">{metric.label}</p>
            <p className="font-mono text-[0.56rem] font-bold text-cream">{metric.value}</p>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-3 h-8 rounded-md border border-success/25 bg-success/5"
      >
        <div className="flex h-full items-center px-2 font-mono text-[0.4rem] text-success">
          All systems within SLA thresholds
        </div>
      </motion.div>
    </VisualFrame>
  );
}

function GenericCapabilityVisual({ title }: { title: string }) {
  return (
    <VisualFrame label={`Module · ${title.toLowerCase()}`}>
      <div className="grid h-full grid-cols-3 grid-rows-3 gap-1.5">
        {[...Array(9)].map((_, index) => (
          <motion.div
            key={index}
            animate={{ opacity: [0.2, 0.55, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.15,
            }}
            className={`rounded-md border border-white/10 ${
              index === 4 ? "border-signal/40 bg-signal/15" : "bg-white/[0.03]"
            }`}
          />
        ))}
      </div>
    </VisualFrame>
  );
}

const visualMap: Record<string, React.ComponentType> = {
  "multimodal-intake": MultimodalIntakeVisual,
  extraction: ExtractionVisual,
  validation: ValidationVisual,
  "review-integration": ReviewIntegrationVisual,
  "platform-layers": PlatformLayersVisual,
  "ai-layer": PlatformLayersVisual,
  "workflow-ui": OrchestrationVisual,
  "ops-dashboard": ObservabilityVisual,
  "agent-tools": AgentToolsVisual,
  orchestration: OrchestrationVisual,
  "control-plane": ReviewIntegrationVisual,
  "agent-ops": ObservabilityVisual,
  "knowledge-ingest": KnowledgeIngestVisual,
  retrieval: RetrievalVisual,
  "knowledge-gov": ObservabilityVisual,
  adoption: SignalsVisual,
  "data-layer": PlatformLayersVisual,
  signals: SignalsVisual,
  forecast: SignalsVisual,
  "decision-board": RetrievalVisual,
  "customer-chat": CustomerChatVisual,
  copilot: WorkforceCopilotVisual,
  routing: RoutingEscalationVisual,
  quality: QualityOptimizationVisual,
  "platform-services": PlatformLayersVisual,
  evaluation: ValidationVisual,
  observability: ObservabilityVisual,
  "governance-ops": ObservabilityVisual,
};

type Props = {
  visualKey: string;
  title: string;
};

export function ModuleCapabilityVisual({ visualKey, title }: Props) {
  const Visual = visualMap[visualKey] ?? (() => <GenericCapabilityVisual title={title} />);
  return <Visual />;
}
