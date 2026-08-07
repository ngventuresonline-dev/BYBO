import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeStats } from "@/components/home/HomeStats";
import { HomeProblem } from "@/components/home/HomeProblem";
import { HomeLeakage } from "@/components/home/HomeLeakage";
import { HomeStack } from "@/components/home/HomeStack";
import { HomeObjection } from "@/components/home/HomeObjection";
import { HomeIndustries } from "@/components/home/HomeIndustries";
import { ClosingCta } from "@/components/dc/ClosingCta";
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
      <HomeStats />
      <HomeProblem />
      <HomeLeakage />
      <HomeStack />
      <HomeObjection />
      <HomeIndustries />
      <ClosingCta
        title="Tell us where the business loses time."
        blurb="We will decide together whether it deserves an AI system, a simpler process fix, or no project at all. All three answers are fine."
        primary={{ href: "/apply", label: "Apply for a consultation" }}
        secondary={{ href: "/how-we-work", label: "How we work" }}
      />
    </>
  );
}
