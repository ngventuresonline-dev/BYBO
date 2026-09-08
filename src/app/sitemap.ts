import type { MetadataRoute } from 'next';
import { services, articles } from '@/lib/redesign';
import { siteUrl } from '@/lib/seo';
export default function sitemap(): MetadataRoute.Sitemap { return [...['/', '/solutions', '/systems', '/blueprint', '/how-we-work', '/industries', '/about', '/insights', '/apply'].map(path => ({ url: siteUrl(path), changeFrequency: 'monthly' as const, priority: path === '/' ? 1 : 0.8 })), ...services.map(s => ({ url: siteUrl(`/systems/${s.slug}`), changeFrequency: 'monthly' as const, priority: 0.8 })), ...articles.map(a => ({ url: siteUrl(`/insights/${a.slug}`), lastModified: new Date(a.date), changeFrequency: 'monthly' as const, priority: 0.7 }))]; }
