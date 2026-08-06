import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";
import { PageHeroIllustration } from "@/components/page-visuals/HeroIllustrations";
import { AboutExperience } from "@/components/about/AboutExperience";
import { PageClosingCta } from "@/components/shared/PageClosingCta";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About BYBO",
  description:
    "BYBO is an enterprise AI systems partner for growing Indian businesses - practical implementation, governed operations, measurable outcomes.",
  path: "/about",
  keywords: ["BYBO", "enterprise AI company India", "AI systems partner"],
});

export default function AboutPage() {
  return (
    <>
      <PageHero visual={<PageHeroIllustration page="about" />}>
        <FadeIn immediate>
          <p className="eyebrow">About BYBO</p>
          <h1 className="display-title mt-7">
            AI systems partner for businesses that need results, not demos.
          </h1>
          <p className="body-large mt-8 max-w-xl">
            We diagnose, build, and operate production AI around your workflows.
          </p>
        </FadeIn>
      </PageHero>

      <AboutExperience />

      <PageClosingCta
        title="Have a workflow worth investigating?"
        href="/apply"
        button="Apply for consultation"
      />
    </>
  );
}
