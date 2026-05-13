export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12 space-y-4">
        <div className="h-8 w-32 mx-auto animate-pulse bg-surface-lighter rounded-lg" />
        <div className="h-4 w-48 mx-auto animate-pulse bg-surface-lighter rounded" />
      </div>
      <div className="h-14 w-full animate-pulse bg-surface-lighter rounded-2xl" />
    </div>
  );
}
