export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-surface-lighter rounded-lg ${className}`}
    />
  );
}

export function GameCardSkeleton() {
  return (
    <div className="rounded-2xl bg-surface border border-border overflow-hidden">
      <Skeleton className="h-48" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function GuideCardSkeleton() {
  return (
    <div className="rounded-xl bg-surface border border-border p-5 space-y-3">
      <div className="flex items-start justify-between">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-16 rounded-md" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="max-w-3xl space-y-6">
          <Skeleton className="h-14 w-3/4" />
          <Skeleton className="h-14 w-1/2" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-4/5" />
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
