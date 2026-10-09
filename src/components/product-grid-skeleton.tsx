export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="পণ্যের তথ্য লোড হচ্ছে"
      role="status"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 w-28 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
          </div>
          <div className="mt-7 h-4 w-full rounded bg-slate-100" />
          <div className="mt-3 h-7 w-36 rounded bg-slate-200" />
        </div>
      ))}
      <span className="sr-only">পণ্যের তথ্য লোড হচ্ছে…</span>
    </div>
  );
}
