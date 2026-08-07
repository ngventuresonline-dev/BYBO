import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCta } from "@/components/dc/ClosingCta";
import { insightArticles } from "@/lib/insight-articles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Written for the person who signs the cheque: why pilots stall, how to rank AI opportunities, and where human approval actually belongs.",
  path: "/insights",
  keywords: [
    "enterprise AI insights",
    "AI adoption India",
    "AI governance writing",
    "BYBO insights",
  ],
});

/** "2026-08-02" → "Aug 2026". */
function shortDate(iso?: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

export default function InsightsPage() {
  const articles = insightArticles
    .filter((article) => article.published)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  return (
    <>
      <section className="dc dc-divide dc-pad pb-13 pt-[clamp(52px,6vw,76px)]">
        <p className="dc-label">Insights</p>
        <h1 className="dc-h1 mt-7 max-w-[14ch]">
          Written for the person who signs the cheque.
        </h1>
      </section>

      <section className="dc-light dc-divide">
        {articles.map((article, i) => (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className="dc-pad grid items-baseline gap-x-10 gap-y-3 py-8 transition-colors hover:bg-[var(--color-surface-2)] min-[1181px]:grid-cols-[150px_1fr_1.1fr]"
            style={{
              borderBottom:
                i === articles.length - 1
                  ? undefined
                  : "1px solid rgba(15,15,17,0.12)",
            }}
          >
            <span
              className="dc-mono text-[11px] uppercase tracking-[0.12em]"
              style={{ color: "rgba(15,15,17,0.45)" }}
            >
              {[shortDate(article.publishedAt), article.readTime]
                .filter(Boolean)
                .join(" · ")}
            </span>
            <h2 className="text-[26px] font-bold tracking-[-0.04em]">
              {article.title}
            </h2>
            <p
              className="text-[16px] leading-[1.5]"
              style={{ color: "rgba(15,15,17,0.62)" }}
            >
              {article.excerpt}
            </p>
          </Link>
        ))}
      </section>

      <ClosingCta
        title="Have the argument with your own numbers."
        blurb="Every framework here is one we run inside a Blueprint. If you would rather we ran it on your workflow, that is the whole offer."
        primary={{ href: "/blueprint", label: "Start a Blueprint" }}
        secondary={{ href: "/apply", label: "Apply for a consultation" }}
      />
    </>
  );
}
