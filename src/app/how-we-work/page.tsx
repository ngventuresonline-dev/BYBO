import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { HowWeWorkExperience } from "@/components/how-we-work/HowWeWorkExperience";
import { PageClosingCta } from "@/components/shared/PageClosingCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "How We Work",
  description:
    "How BYBO diagnoses bottlenecks, builds AI systems with human approval, and operates them with measurable accountability.",
  path: "/how-we-work",
  keywords: [
    "AI implementation process",
    "enterprise AI delivery",
    "AI systems partner India",
    "human in the loop AI",
  ],
});

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="howWeWork" />}>
        <FadeIn immediate>
          <p className="eyebrow">How we work</p>
          <h1 className="display-title mt-7">
            Problem → System → Results.
          </h1>
          <p className="body-large mt-8 max-w-xl">
            Four clear stages. Pick how you want to engage. See the system run before you commit.
          </p>
        </FadeIn>
      </PageHero>

      <HowWeWorkExperience />

      <PageClosingCta
        label="Start here"
        title="Begin with the AI Opportunity Blueprint."
        href="/blueprint"
        button="Explore the Blueprint"
      />
    </>
  );
}
