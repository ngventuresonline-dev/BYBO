"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { InsightArticle, InsightBlock } from "@/lib/insight-articles";
import {
  insightVisualMap,
  type InsightVisualKey,
} from "@/components/page-visuals/InsightVisuals";
import { SignalAccentSurface } from "@/components/SignalAccentSurface";

function VisualBlock({
  visual,
  caption,
}: {
  visual: InsightVisualKey;
  caption?: string;
}) {
  const Component = insightVisualMap[visual];
  return (
    <figure className="my-10">
      <Component />
      {caption && (
        <figcaption className="mt-3 font-mono text-[0.55rem] uppercase tracking-[0.1em] text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function BlockRenderer({ block }: { block: InsightBlock }) {
  switch (block.type) {
    case "prose":
      return (
        <div className="space-y-5">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-base leading-8 text-fog">
              {paragraph}
            </p>
          ))}
        </div>
      );

    case "heading":
      if (block.level === 3) {
        return (
          <h3 className="mt-10 font-display text-xl font-bold tracking-[-0.035em] text-cream">
            {block.text}
          </h3>
        );
      }
      return (
        <h2 className="mt-14 font-display text-2xl font-bold tracking-[-0.04em] text-cream sm:text-3xl">
          {block.text}
        </h2>
      );

    case "visual":
      return <VisualBlock visual={block.visual} caption={block.caption} />;

    case "stats":
      return (
        <div className="my-10 grid gap-3 sm:grid-cols-3">
          {block.items.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-line bg-panel p-5"
            >
              <p className="technical-label text-dim">{item.label}</p>
              <p className="mt-2 font-display text-3xl font-bold tracking-[-0.04em] text-signal">
                {item.value}
              </p>
              {item.detail && (
                <p className="mt-2 text-xs leading-5 text-fog">{item.detail}</p>
              )}
            </div>
          ))}
        </div>
      );

    case "callout":
      return block.variant === "action" ? (
        <SignalAccentSurface
          as="aside"
          variant="soft"
          className="my-10 rounded-[1.2rem] p-6 sm:p-7"
        >
          <p className="technical-label text-signal">{block.title}</p>
          <p className="mt-3 text-sm leading-7 text-fog">{block.body}</p>
        </SignalAccentSurface>
      ) : (
        <aside
          className={`my-10 rounded-[1.2rem] border p-6 sm:p-7 ${
            block.variant === "caution"
              ? "border-white/15 bg-white/[0.03]"
              : "border-line bg-panel"
          }`}
        >
          <p className="technical-label text-signal">{block.title}</p>
          <p className="mt-3 text-sm leading-7 text-fog">{block.body}</p>
        </aside>
      );

    case "checklist":
      return (
        <div className="my-10 rounded-[1.2rem] border border-line bg-panel p-6 sm:p-7">
          <p className="technical-label text-signal">{block.title}</p>
          <ul className="mt-5 space-y-3">
            {block.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-6 text-fog"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      );

    case "pullquote":
      return (
        <blockquote className="my-10 border-l-2 border-signal pl-6">
          <p className="font-display text-xl font-bold leading-snug tracking-[-0.03em] text-cream sm:text-2xl">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.attribution && (
            <cite className="mt-3 block font-mono text-[0.58rem] uppercase tracking-[0.1em] text-dim not-italic">
              {block.attribution}
            </cite>
          )}
        </blockquote>
      );

    case "links":
      return (
        <div className="my-10 rounded-[1.2rem] border border-line bg-void/50 p-6 sm:p-7">
          <p className="technical-label text-signal">{block.title}</p>
          <ul className="mt-5 divide-y divide-line">
            {block.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-start justify-between gap-4 py-4 transition-colors hover:text-cream"
                >
                  <div>
                    <p className="font-display text-base font-bold text-cream group-hover:text-signal">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="mt-1 text-sm leading-6 text-fog">
                        {link.description}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="mt-1 shrink-0 text-dim group-hover:text-signal"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}

export function InsightArticleContent({ article }: { article: InsightArticle }) {
  return (
    <div className="space-y-6">
      {article.blocks.map((block, index) => (
        <BlockRenderer key={`${article.slug}-block-${index}`} block={block} />
      ))}
    </div>
  );
}
