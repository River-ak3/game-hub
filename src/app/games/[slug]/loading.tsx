export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-4 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-12 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-4 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-20 animate-pulse bg-surface-lighter rounded" />
      </div>
      {/* Game header skeleton */}
      <div className="rounded-2xl bg-surface border border-border overflow-hidden animate-pulse">
        <div className="h-48 bg-surface-lighter" />
        <div className="p-6 sm:p-8 -mt-12 space-y-3">
          <div className="flex gap-2">
            <div className="h-5 w-16 bg-surface-lighter rounded-full" />
            <div className="h-5 w-20 bg-surface-lighter rounded-full" />
          </div>
          <div className="h-8 w-48 bg-surface-lighter rounded-lg" />
          <div className="h-4 w-full bg-surface-lighter rounded" />
          <div className="h-4 w-3/4 bg-surface-lighter rounded" />
        </div>
      </div>
      {/* Guide list skeleton */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-surface border border-border p-5 space-y-3">
            <div className="flex justify-between">
              <div className="h-5 w-3/4 bg-surface-lighter rounded" />
              <div className="h-5 w-12 bg-surface-lighter rounded-full" />
            </div>
            <div className="h-4 w-full bg-surface-lighter rounded" />
            <div className="h-4 w-2/3 bg-surface-lighter rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
