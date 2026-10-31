import { instagramConfig, liveConfigured } from './config';
import { createGraphClient, InstagramError } from './graph';
import { publishInstagram } from './publish';
import { redactSecrets } from './redact';
import { ScheduleError, type ScheduleDeps } from './schedule';
import { delay } from './time';

export function publisherFromEnv(env: NodeJS.ProcessEnv = process.env): ScheduleDeps {
  const config = instagramConfig(env);
  const secrets = [config.token, config.mediaToken, env.CRON_SECRET];
  return {
    secrets,
    publish: async (post, report) => {
      if (!config.dryRun && !liveConfigured(config)) throw new ScheduleError('not_configured');
      const graph = !config.dryRun && config.token && config.userId
        ? createGraphClient({ token: config.token, userId: config.userId })
        : {
            userId: config.userId ?? '',
            async request(): Promise<never> {
              throw new InstagramError('Instagram was called during a dry run');
            },
          };
      return publishInstagram(post, {
        dryRun: config.dryRun,
        graph,
        sleep: delay,
        onProgress: report,
        log: (message, fields) => {
          console.info(message, redactSecrets(JSON.stringify(fields), secrets));
        },
      });
    },
  };
}
