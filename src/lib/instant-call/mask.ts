/** Logs may show this. They must not show the full number. */
export function maskPhone(phone: string | null | undefined): string {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '***';
  const prefix = phone.startsWith('+') ? phone.slice(0, Math.min(3, phone.length)) : '';
  return `${prefix}******${digits.slice(-4)}`;
}

export function maskEmail(email: string | null | undefined): string {
  if (!email || !email.includes('@')) return '***';
  const [user, domain] = email.split('@');
  return `${(user ?? '').slice(0, 1) || '*'}***@${domain}`;
}
