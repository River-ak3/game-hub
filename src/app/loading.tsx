import { HeroSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div>
      <HeroSkeleton />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-32 animate-pulse bg-surface-lighter rounded-lg" />
          <div className="h-4 w-48 animate-pulse bg-surface-lighter rounded" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-surface border border-border overflow-hidden">
              <div className="h-48 animate-pulse bg-surface-lighter" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-2/3 animate-pulse bg-surface-lighter rounded" />
                <div className="h-4 w-full animate-pulse bg-surface-lighter rounded" />
                <div className="h-4 w-4/5 animate-pulse bg-surface-lighter rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
