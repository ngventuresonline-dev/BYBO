import type { ReactNode } from "react";

type PageHeroProps = {
  children: ReactNode;
  visual?: ReactNode;
  className?: string;
};

export function PageHero({ children, visual, className = "" }: PageHeroProps) {
  return (
    <section className={`page-hero ${className}`.trim()}>
      <div className="section-shell relative">
        <div className={visual ? "page-hero-grid" : "page-hero-copy min-w-0"}>
          {visual ? (
            <>
              <div className="page-hero-copy min-w-0">{children}</div>
              <div className="page-hero-aside-wrap min-w-0">{visual}</div>
            </>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );
}
