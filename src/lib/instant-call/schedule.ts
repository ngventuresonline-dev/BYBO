import { after } from 'next/server';
import { captureWebsiteLead, type WebsiteLeadInput } from './flow';

/** Register lead capture after the enquiry response. Never dials on the request itself. */
export function scheduleLeadCapture(input: WebsiteLeadInput) {
  const task = () => captureWebsiteLead(input).catch((err: unknown) => {
    console.error('lead capture failed', err instanceof Error ? err.message : 'error');
  });
  try {
    after(task);
  } catch (err) {
    if (!process.env.NODE_TEST_CONTEXT) {
      console.error('lead capture was not scheduled', err instanceof Error ? err.message : 'error');
    }
  }
}
