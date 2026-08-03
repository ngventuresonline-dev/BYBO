export function moduleVisualKey(title: string): string {
  const keys: Record<string, string> = {
    "Platform foundation": "platform-layers",
    "AI capability layer": "ai-layer",
    "Workflow and experience": "workflow-ui",
    "Platform operations": "ops-dashboard",
    "Agent roles and tools": "agent-tools",
    "Orchestration and memory": "orchestration",
    "Human control plane": "control-plane",
    "Agent operations": "agent-ops",
    "Knowledge ingestion": "knowledge-ingest",
    "Retrieval and answer layer": "retrieval",
    "Knowledge governance": "knowledge-gov",
    "Adoption and improvement": "adoption",
    "Trusted data layer": "data-layer",
    "Signal and driver analysis": "signals",
    "Forecast and scenarios": "forecast",
    "Decision workspace": "decision-board",
    "Customer assistance": "customer-chat",
    "Workforce copilot": "copilot",
    "Routing and escalation": "routing",
    "Quality and optimization": "quality",
    "Multimodal intake": "multimodal-intake",
    "Extraction and understanding": "extraction",
    "Validation and reconciliation": "validation",
    "Review and integration": "review-integration",
    "AI platform services": "platform-services",
    "Evaluation framework": "evaluation",
    "Observability and FinOps": "observability",
    "Governance operations": "governance-ops",
  };

  return (
    keys[title] ??
    title
      .toLowerCase()
      .replace(/\s+and\s+/g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}
