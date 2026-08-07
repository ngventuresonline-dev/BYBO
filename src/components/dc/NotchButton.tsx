import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost" | "surface";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "",
  ghost: "dc-btn--ghost",
  surface: "dc-btn--surface",
};

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Trailing glyph. Defaults to the design's right arrow; pass null to drop it. */
  arrow?: ReactNode;
};

type LinkProps = BaseProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;

type ButtonProps = BaseProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

function Inner({ children, arrow }: Pick<BaseProps, "children" | "arrow">) {
  return (
    <>
      <span className="dc-btn__pip" aria-hidden />
      <span className="dc-btn__label">
        {children}
        {arrow !== null ? (
          <span className="dc-btn__arrow" aria-hidden>
            {arrow ?? "→"}
          </span>
        ) : null}
      </span>
    </>
  );
}

/**
 * The site's signature call to action: a clip-path notched slab with a pulsing
 * pip. Renders a Next link for internal hrefs, a plain anchor for external and
 * `mailto:` / `tel:` targets, and a button when no href is given.
 */
export function NotchButton(props: LinkProps | ButtonProps) {
  const { children, variant = "primary", className = "", arrow } = props;
  const classes = ["dc-btn", VARIANT_CLASS[variant], className]
    .filter(Boolean)
    .join(" ");

  if (props.href !== undefined) {
    const { href, children: _c, variant: _v, className: _cn, arrow: _a, ...rest } = props;
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);

    if (isExternal) {
      return (
        <a href={href} className={classes} {...rest}>
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...rest}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  const { children: _c, variant: _v, className: _cn, arrow: _a, ...rest } = props;
  return (
    <button type="button" className={classes} {...rest}>
      <Inner arrow={arrow}>{children}</Inner>
    </button>
  );
}
