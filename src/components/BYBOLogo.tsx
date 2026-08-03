type LogoProps = {
  variant?: "nav" | "footer" | "hero";
  className?: string;
};

function SignalDot({
  variant = "nav",
  className = "",
}: {
  variant?: "nav" | "footer" | "hero";
  className?: string;
}) {
  const size =
    variant === "hero"
      ? "h-3 w-3"
      : variant === "footer"
        ? "h-2.5 w-2.5"
        : "h-2.5 w-2.5";

  return (
    <span
      className={`${size} shrink-0 rounded-[0.12rem] bg-signal shadow-[0_0_16px_rgba(176,38,255,0.55)] transition-transform duration-200 group-hover:rotate-45 group-hover:shadow-[0_0_24px_rgba(176,38,255,0.75)] ${className}`}
      aria-hidden="true"
    />
  );
}

export function BYBOLogo({ variant = "nav", className = "" }: LogoProps) {
  const titleClass =
    variant === "hero"
      ? "text-[1.75rem]"
      : variant === "footer"
        ? "text-2xl"
        : "text-xl sm:text-[1.35rem]";

  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        className={`font-display font-extrabold tracking-[-0.055em] text-cream ${titleClass}`}
      >
        BYBO
      </span>
      <SignalDot variant={variant} />
    </span>
  );
}
