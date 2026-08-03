import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Privacy",
  description: "BYBO privacy information.",
};

export default function PrivacyPage() {
  return (
    <PageHero>
      <FadeIn immediate>
        <p className="eyebrow">Privacy</p>
        <h1 className="section-title mt-6">Privacy information</h1>
        <div className="mt-10 max-w-3xl space-y-8 text-sm leading-7 text-fog">
          <p>
            The current consultation form prepares an email or WhatsApp message
            on your device. This website preview does not store the information
            entered into that form.
          </p>
          <div>
            <h2 className="font-display text-xl font-bold text-cream">
              Direct communication
            </h2>
            <p className="mt-3">
              Information you choose to send by email or WhatsApp is processed
              through those providers and used by BYBO to evaluate and respond
              to your enquiry.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-cream">
              Production launch
            </h2>
            <p className="mt-3">
              Before a production launch, BYBO should publish a complete privacy
              policy covering analytics, form processing, retention, service
              providers, user rights, and contact procedures.
            </p>
          </div>
          <p>
            Privacy questions:{" "}
            <a href="mailto:hello@bybo.in" className="text-signal">
              hello@bybo.in
            </a>
          </p>
        </div>
      </FadeIn>
    </PageHero>
  );
}
