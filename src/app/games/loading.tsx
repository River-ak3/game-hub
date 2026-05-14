export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 space-y-2">
        <div className="h-8 w-32 animate-pulse bg-surface-lighter rounded-lg" />
        <div className="h-4 w-48 animate-pulse bg-surface-lighter rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-surface border border-border p-6 space-y-3">
            <div className="h-5 w-2/3 animate-pulse bg-surface-lighter rounded" />
            <div className="h-4 w-full animate-pulse bg-surface-lighter rounded" />
            <div className="h-4 w-4/5 animate-pulse bg-surface-lighter rounded" />
            <div className="flex gap-2 mt-2">
              <div className="h-5 w-14 animate-pulse bg-surface-lighter rounded-md" />
              <div className="h-5 w-20 animate-pulse bg-surface-lighter rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
