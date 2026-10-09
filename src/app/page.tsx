"use client";

import { HeroSection } from "@/components/hero-section";
import { useMarketData } from "@/components/market-data-provider";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

export default function HomePage() {
  const { products, loading, error, refresh } = useMarketData();
  const topRisers = [...products]
    .filter((product) => product.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const topFallers = [...products]
    .filter((product) => product.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div>
      <HeroSection />

      {error ? (
        <div
          role="alert"
          className="mx-auto mb-8 max-w-6xl rounded-2xl border border-rose-200 bg-rose-50 p-5 text-rose-800"
        >
          <p className="font-semibold">{error}</p>
          <button
            type="button"
            onClick={refresh}
            className="mt-3 rounded-full bg-rose-700 px-4 py-2 text-sm font-semibold text-white"
          >
            আবার চেষ্টা করুন
          </button>
        </div>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900">আজ দাম বেড়েছে ▲</h2>
        </div>
        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-black text-slate-900">আজ দাম কমেছে ▼</h2>
        </div>
        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {topFallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section
        id="সব-পণ্য"
        className="mx-auto max-w-6xl scroll-mt-44 px-4 pb-16"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-900">সব পণ্য</h2>
            <p className="mt-1 text-slate-500">নির্বাচিত পণ্যের বাজারদর দেখে নিন</p>
          </div>
        </div>

        {loading ? (
          <ProductGridSkeleton count={9} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
