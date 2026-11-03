import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { ADMIN_COOKIE, adminSessionValue } from '@/lib/instagram/auth';
import { safeEqual } from '@/lib/instant-call/secrets';
import { crmConfigured } from '@/lib/crm/db';
import { pageMetadata } from '@/lib/seo';
import { CrmApp } from './CrmApp';
import { CrmLogin } from './CrmLogin';
import './crm.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = pageMetadata({
  title: 'Leads',
  description: 'Internal lead desk for BYBO.',
  path: '/admin/crm',
  noIndex: true,
});

/** The founder's lead desk. Same sign-in as the Instagram desk (CRON_SECRET). */
export default async function CrmPage() {
  const secret = process.env.CRON_SECRET;
  if (!secret) return <div className="crm"><p className="crm-empty">Admin access is not configured.</p></div>;
  const jar = await cookies();
  if (!safeEqual(jar.get(ADMIN_COOKIE)?.value ?? '', adminSessionValue(secret))) {
    return <div className="crm crm-center"><CrmLogin /></div>;
  }
  if (!crmConfigured()) {
    return (
      <div className="crm crm-center">
        <div className="crm-login">
          <p className="crm-kicker">BYBO · Leads</p>
          <h1>Almost there</h1>
          <p>The lead database isn&apos;t connected yet. Add <code>BYBO_CRM_SUPABASE_URL</code> and <code>BYBO_CRM_SUPABASE_KEY</code> in Vercel, then redeploy.</p>
        </div>
      </div>
    );
  }
  return <div className="crm"><CrmApp /></div>;
}
