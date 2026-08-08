import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { CONTACT } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Apply for Consultation",
  description:
    "Tell BYBO where your business loses time. Forty-five minutes, no slides — we will suggest a Blueprint, point you to a cheaper fix, or tell you this is not a job for AI.",
  path: "/apply",
  keywords: ["AI consultation", "enterprise AI inquiry", "BYBO apply"],
});

export default function ApplyPage() {
  return (
    <section className="dc dc-divide grid min-[861px]:grid-cols-[1fr_1.15fr]">
      <div
        className="dc-pad dc-section min-[861px]:border-r"
        style={{ borderColor: "var(--dc-line)" }}
      >
        <div className="min-[861px]:sticky min-[861px]:top-[100px]">
          <p className="dc-label">Apply for a consultation</p>
          <h1 className="dc-h1 mt-7 max-w-[12ch] text-[clamp(38px,5.2vw,76px)] leading-[0.88]">
            Tell us where the time goes.
          </h1>
          <p
            className="mt-6 max-w-[42ch] text-[18px] leading-[1.5]"
            style={{ color: "var(--dc-muted)" }}
          >
            Forty-five minutes, no slides. We will either suggest a Blueprint, point you
            to a cheaper fix you can do without us, or tell you this is not a job for AI.
          </p>

          <div
            className="dc-mono mt-8 grid gap-2 text-[13px]"
            style={{ color: "rgba(236,234,228,0.55)" }}
          >
            <a href={`mailto:${CONTACT.email}`} className="hover:text-signal">
              {CONTACT.email}
            </a>
            <a href={`tel:${CONTACT.phoneHref}`} className="hover:text-signal">
              {CONTACT.phone} · WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="dc-light dc-form-light dc-pad dc-section">
        <Suspense
          fallback={
            <div
              className="min-h-[34rem] animate-pulse"
              style={{ background: "rgba(15,15,17,0.05)" }}
            />
          }
        >
          <ApplicationForm />
        </Suspense>
      </div>
    </section>
  );
}
