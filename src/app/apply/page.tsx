import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { FadeIn } from "@/components/FadeIn";
import { ApplyFlowVisual } from "@/components/page-visuals/SharedPageVisuals";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apply for Consultation",
  description:
    "Tell BYBO where your business loses time. Share your workflow bottleneck and we'll assess whether an AI system, Blueprint, or no project is the right first move.",
  path: "/apply",
  keywords: ["AI consultation", "enterprise AI inquiry", "BYBO apply"],
});

export default function ApplyPage() {
  return (
    <section className="grain relative min-h-svh overflow-hidden pt-[4.6rem]">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bybo-hero-future-business.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/40 via-void/92 to-void" />
      </div>
      <div className="section-shell relative !pt-14">
        <FadeIn immediate>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="eyebrow">Apply</p>
              <h1 className="section-title mt-6">
                Bring us the workflow, not an AI shopping list.
              </h1>
              <p className="body-large mt-6 max-w-xl">
                Tell us where time, revenue, quality, or visibility is being
                lost. We&apos;ll use the first consultation to decide whether
                there is a credible next step.
              </p>

              <div className="mt-9">
                <ApplyFlowVisual />
              </div>
            </div>

            <Suspense
              fallback={
                <div className="technical-card min-h-[34rem] animate-pulse" />
              }
            >
              <ApplicationForm />
            </Suspense>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
