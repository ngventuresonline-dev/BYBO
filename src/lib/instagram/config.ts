/**
 * Live posting is opt-in. An unset IG_POST_DRY_RUN, or any value other than
 * the exact word "false", creates nothing on Instagram.
 */

export const GRAPH_ROOT = 'https://graph.facebook.com/v21.0';
export const MEDIA_PATH_PREFIX = 'bybo-instagram/media/';
export const POST_PATH_PREFIX = 'bybo-instagram/posts/';
export const MAX_MEDIA_BYTES = 250 * 1024 * 1024;
export const CAPTION_LIMIT = 2200;

export type InstagramConfig = {
  dryRun: boolean;
  userId: string | null;
  token: string | null;
  mediaToken: string | null;
};

export function isDryRun(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env.IG_POST_DRY_RUN;
  if (raw == null || raw.trim() === '') return true;
  return raw.trim().toLowerCase() !== 'false';
}

export function instagramConfig(env: NodeJS.ProcessEnv = process.env): InstagramConfig {
  return {
    dryRun: isDryRun(env),
    userId: env.IG_USER_ID?.trim() || null,
    token: env.IG_ACCESS_TOKEN?.trim() || null,
    mediaToken: env.IG_BLOB_READ_WRITE_TOKEN?.trim() || null,
  };
}

export function liveConfigured(config: InstagramConfig): boolean {
  return Boolean(config.userId && config.token);
}
