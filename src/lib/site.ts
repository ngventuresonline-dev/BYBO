/**
 * Contact details, in one place.
 *
 * Everything user-facing should import these rather than repeating a literal —
 * an address hardcoded in eight components is how the site ended up offering
 * two different ones.
 */
export const CONTACT = {
  email: "support@bybo.in",
  emailHref: "mailto:support@bybo.in",
  phone: "+91 63643 54899",
  phoneHref: "+916364354899",
  whatsapp: "916364354899",
  city: "Bengaluru",
  parent: "N&G Ventures",
  partner: "Bcon Club",
} as const;
