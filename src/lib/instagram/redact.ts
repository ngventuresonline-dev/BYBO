/** Remove access tokens from anything we might log or return. */

export function redactSecrets(text: string, secrets: Array<string | null | undefined> = []): string {
  let out = text;
  for (const secret of secrets) {
    if (secret && secret.length >= 8) out = out.split(secret).join('[redacted]');
  }
  out = out.replace(/access_token=[^&\s"'<>]+/gi, 'access_token=[redacted]');
  out = out.replace(/Bearer\s+[A-Za-z0-9._\-+/=]+/gi, 'Bearer [redacted]');
  return out;
}

export function containsSecret(text: string, secrets: Array<string | null | undefined>): boolean {
  return secrets.some((secret) => Boolean(secret && secret.length >= 8 && text.includes(secret)));
}
