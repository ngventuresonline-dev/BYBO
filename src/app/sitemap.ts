import type { MetadataRoute } from "next";
import { insightArticles } from "@/lib/insight-articles";
import { systems } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: siteUrl("/systems"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/industries"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: siteUrl("/blueprint"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: siteUrl("/apply"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: siteUrl("/how-we-work"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: siteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl("/insights"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: siteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const systemRoutes: MetadataRoute.Sitemap = systems.map((system) => ({
    url: siteUrl(`/systems/${system.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insightArticles
    .filter((article) => article.published)
    .map((article) => ({
      url: siteUrl(`/insights/${article.slug}`),
      lastModified: article.publishedAt
        ? new Date(article.publishedAt)
        : now,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    }));

  return [...staticRoutes, ...systemRoutes, ...insightRoutes];
}
