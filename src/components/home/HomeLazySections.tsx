"use client";

import dynamic from "next/dynamic";

function SectionSkeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[1.35rem] border border-line bg-panel/60 ${className}`}
      aria-hidden="true"
    />
  );
}

export const LazyInteractiveSystemDemo = dynamic(
  () =>
    import("@/components/InteractiveSystemDemo").then(
      (module) => module.InteractiveSystemDemo,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[28rem]" />,
  },
);

export const LazyWorkflowExplorer = dynamic(
  () =>
    import("@/components/WorkflowExplorer").then(
      (module) => module.WorkflowExplorer,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[24rem]" />,
  },
);

export const LazyOpportunityFinder = dynamic(
  () =>
    import("@/components/OpportunityFinder").then(
      (module) => module.OpportunityFinder,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[26rem]" />,
  },
);

export const LazyIndustryStage = dynamic(
  () =>
    import("@/components/IndustryStage").then((module) => module.IndustryStage),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[22rem] lg:min-h-[38rem]" />,
  },
);

export const LazyConnectedToolsRail = dynamic(
  () =>
    import("@/components/ConnectedToolsRail").then(
      (module) => module.ConnectedToolsRail,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[10rem]" />,
  },
);

export const LazySpatialHeroVisual = dynamic(
  () =>
    import("@/components/SpatialHeroVisual").then(
      (module) => module.SpatialHeroVisual,
    ),
  {
    ssr: false,
  },
);

export const LazyHomePlatformStage = dynamic(
  () =>
    import("@/components/HomePlatformStage").then(
      (module) => module.HomePlatformStage,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[32rem] lg:min-h-[38rem]" />,
  },
);

export const LazyHomeFragmentedFlow = dynamic(
  () =>
    import("@/components/HomeFragmentedFlow").then(
      (module) => module.HomeFragmentedFlow,
    ),
  {
    ssr: false,
    loading: () => <SectionSkeleton className="min-h-[22rem]" />,
  },
);
