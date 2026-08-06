import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeLiveTicker } from "@/components/HomeLiveTicker";
import { HomeWorkflowSpotlight } from "@/components/home/HomeWorkflowSpotlight";
import { HomeFinalCta } from "@/components/HomeFinalCta";
import {
  LazyHomePlatformStage,
  LazyIndustryStage,
  LazyOpportunityFinder,
} from "@/components/home/HomeLazySections";
import { pageMetadata, SITE } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: SITE.defaultTitle,
  description: SITE.defaultDescription,
  path: "/",
  keywords: [
    "enterprise AI systems India",
    "custom AI platforms",
    "agentic AI operations",
    "enterprise knowledge systems",
    "AI systems partner",
    "BYBO",
  ],
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeLiveTicker />
      <HomeWorkflowSpotlight />
      <LazyHomePlatformStage />
      <section className="home-section bg-surface text-surface-ink">
        <div className="section-shell !pb-8 !pt-10 sm:!pb-10 sm:!pt-12">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
            <div className="max-w-lg">
              <p className="eyebrow text-surface-muted">Who BYBO is for</p>
              <h2 className="section-title mt-4 text-surface-ink">
                Your industry changes the system.
              </h2>
            </div>
          </div>
          <LazyIndustryStage />
        </div>
      </section>
      <section className="home-section border-t border-line bg-void">
        <div className="section-shell !py-10 sm:!py-14">
          <div className="mb-6 max-w-lg sm:mb-8">
            <p className="eyebrow">Find your starting point</p>
            <h2 className="section-title mt-4">Where does momentum break?</h2>
          </div>
          <LazyOpportunityFinder />
        </div>
      </section>
      <HomeFinalCta />
    </>
  );
}
