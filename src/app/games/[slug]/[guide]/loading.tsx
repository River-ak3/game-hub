export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex gap-2 mb-6">
        <div className="h-4 w-4 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-12 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-4 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-20 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-4 animate-pulse bg-surface-lighter rounded" />
        <div className="h-4 w-32 animate-pulse bg-surface-lighter rounded" />
      </div>
      <article className="max-w-4xl mx-auto">
        {/* Header skeleton */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-2">
            <div className="h-5 w-16 animate-pulse bg-surface-lighter rounded-full" />
            <div className="h-5 w-12 animate-pulse bg-surface-lighter rounded-full" />
          </div>
          <div className="h-10 w-3/4 animate-pulse bg-surface-lighter rounded-lg" />
          <div className="h-5 w-full animate-pulse bg-surface-lighter rounded" />
          <div className="h-5 w-2/3 animate-pulse bg-surface-lighter rounded" />
          <div className="h-4 w-48 animate-pulse bg-surface-lighter rounded" />
          <hr className="border-border" />
        </div>
        {/* Content skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-full animate-pulse bg-surface-lighter rounded" />
              <div className="h-4 w-4/5 animate-pulse bg-surface-lighter rounded" />
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
