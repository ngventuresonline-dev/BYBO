import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FadeIn } from "@/components/FadeIn";
import { SystemHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { SystemDetailStage } from "@/components/systems/SystemDetailStage";
import { PageClosingCta } from "@/components/shared/PageClosingCta";
import { systems } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

const legacySystemRoutes: Record<string, string> = {
  revenue: "custom-ai-platforms",
  "customer-experience": "customer-workforce-ai",
  "brand-intelligence": "enterprise-knowledge-systems",
  "business-operations": "agentic-operations",
};

export function generateStaticParams() {
  return [
    ...systems.map((system) => ({ slug: system.slug })),
    ...Object.keys(legacySystemRoutes).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = legacySystemRoutes[slug] ?? slug;
  const system = systems.find((item) => item.slug === resolvedSlug);
  if (!system) return {};
  return pageMetadata({
    title: system.name,
    description: `${system.short} ${system.description}`.slice(0, 160),
    path: `/systems/${system.slug}`,
    keywords: [
      system.name,
      "enterprise AI system",
      "BYBO",
      ...system.capabilities.slice(0, 3),
    ],
  });
}

export default async function SystemDetailPage({ params }: Props) {
  const { slug } = await params;
  if (legacySystemRoutes[slug]) {
    redirect(`/systems/${legacySystemRoutes[slug]}`);
  }
  const system = systems.find((item) => item.slug === slug);
  if (!system) notFound();

  const Icon = system.icon;

  return (
    <>
      <section className="page-hero relative overflow-hidden">
        <div className="section-shell relative">
          <FadeIn immediate>
            <Link
              href="/systems"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-dim hover:text-cream"
            >
              <ArrowLeft size={14} /> All systems
            </Link>
            <div className="page-hero-grid mt-8">
              <div className="page-hero-copy min-w-0">
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.035] text-signal">
                    <Icon size={21} />
                  </span>
                  <span className="technical-label text-signal">
                    System / {system.index}
                  </span>
                </div>
                <h1 className="display-title mt-7">{system.name}</h1>
                <p className="font-display mt-6 text-2xl font-bold leading-tight tracking-[-0.04em] text-cream sm:text-3xl">
                  {system.promise}
                </p>
                <p className="mt-5 max-w-xl text-base leading-7 text-fog">
                  {system.short}
                </p>
              </div>
              <div className="page-hero-aside-wrap min-w-0">
                <SystemHeroIllustration slug={system.slug} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <SystemDetailStage slug={system.slug} />

      <PageClosingCta
        label="Investigate this system"
        title="Show us the workflow. We will tell you if this system fits."
        href={`/apply?system=${system.slug}`}
        button={`Discuss ${system.name}`}
      />
    </>
  );
}
