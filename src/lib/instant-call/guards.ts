import { allowlistAllows } from './allowlist';

/**
 * Last line before any ElevenLabs dial. The switch defaults off.
 * Development and the test runner can never place a call.
 */
export function assertCanDial(env: NodeJS.ProcessEnv, phone: string | null): void {
  if (env.NODE_TEST_CONTEXT || env.NODE_ENV === 'development') {
    throw new Error('instant call refused: non-production');
  }
  if (env.INSTANT_CALL_ENABLED !== 'true') throw new Error('instant call refused: switch off');
  if (env.INSTANT_CALL_DRY_RUN === 'true') throw new Error('instant call refused: dry run');
  if (!allowlistAllows(env.INSTANT_CALL_ALLOWLIST, phone)) throw new Error('instant call refused: allowlist');
  if (!env.BYBO_ELEVENLABS_API_KEY || !env.BYBO_ELEVENLABS_AGENT_ID || !env.BYBO_ELEVENLABS_PHONE_NUMBER_ID) {
    throw new Error('instant call refused: elevenlabs not configured');
  }
}
