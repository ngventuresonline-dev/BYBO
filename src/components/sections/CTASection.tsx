"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "../FadeIn";

export function CTASection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="bg-ink text-paper rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-xl mx-auto">
                Let&apos;s see where AI fits your business
              </h2>
              <p className="text-white/50 mt-4 max-w-md mx-auto">
                30-minute audit. No pitch deck. Just an honest look at what AI
                can do for you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/916360079756?text=Hi%20BYBO%2C%20I%27d%20like%20to%20book%20a%20free%20AI%20audit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent text-paper font-medium px-8 py-4 rounded-full hover:brightness-110 transition-all"
                >
                  Book on WhatsApp
                  <ArrowUpRight size={18} />
                </a>
                <a
                  href="mailto:support@bybo.in"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-paper font-medium px-8 py-4 rounded-full hover:bg-white/5 transition-all"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
