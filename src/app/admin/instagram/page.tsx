import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminSessionValue } from '@/lib/instagram/auth';
import { instagramConfig, liveConfigured } from '@/lib/instagram/config';
import { createGraphClient, instagramHealth, InstagramError } from '@/lib/instagram/graph';
import { redactSecrets } from '@/lib/instagram/redact';
import { getPostStore, PostStoreUnavailable } from '@/lib/instagram/store';
import type { IgPost } from '@/lib/instagram/types';
import { safeEqual } from '@/lib/instant-call/secrets';
import { pageMetadata } from '@/lib/seo';
import { InstagramDesk } from './InstagramDesk';
import { LoginForm } from './LoginForm';
import './instagram.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata({
  title: 'Instagram desk',
  description: 'Internal desk for the BYBO Instagram account.',
  path: '/admin/instagram',
  noIndex: true,
});

export default async function InstagramAdminPage() {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return <div className="ig-desk"><p className="ig-warn">Admin access is not configured.</p></div>;
  }
  const jar = await cookies();
  if (!safeEqual(jar.get(ADMIN_COOKIE)?.value ?? '', adminSessionValue(secret))) {
    return (
      <div className="ig-desk">
        <LoginForm />
      </div>
    );
  }

  let posts: IgPost[] = [];
  let storeError: string | null = null;
  try {
    posts = (await (await getPostStore()).list()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    storeError = err instanceof PostStoreUnavailable
      ? 'The post store is not configured.'
      : 'The post list could not be read.';
  }

  const config = instagramConfig();
  let health: { username: string; usage: number; total: number; durationSeconds: number } | null = null;
  let healthError: string | null = null;
  if (!liveConfigured(config) || !config.token || !config.userId) {
    healthError = 'Instagram credentials are not configured.';
  } else {
    try {
      health = await instagramHealth(createGraphClient({ token: config.token, userId: config.userId }));
    } catch (err) {
      const message = err instanceof InstagramError ? err.message : 'Instagram could not be reached.';
      healthError = redactSecrets(message, [config.token, config.mediaToken]);
    }
  }

  return (
    <div className="ig-desk">
      <InstagramDesk
        initialPosts={posts}
        dryRun={config.dryRun}
        health={health}
        healthError={healthError}
        storeError={storeError}
      />
    </div>
  );
}
