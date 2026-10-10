"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

import { useMarketData } from "@/components/market-data-provider";
import { ProductCard } from "@/components/product-card";
import { ProductGridSkeleton } from "@/components/product-grid-skeleton";

function CategoryContent() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug ?? "";
  const { products: allProducts, categories, loading, error, refresh } = useMarketData();
  const category = categories.find((item) => item.slug === slug);
  const [sortMode, setSortMode] = useState<"default" | "asc" | "desc">("default");

  const products = useMemo(() => {
    const base = allProducts.filter((product) => product.category === slug);

    if (sortMode === "asc") return [...base].sort((a, b) => a.price - b.price);
    if (sortMode === "desc") return [...base].sort((a, b) => b.price - a.price);
    return base;
  }, [allProducts, slug, sortMode]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 h-9 w-48 animate-pulse rounded bg-slate-200" />
        <ProductGridSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-slate-900">বাজারের তথ্য লোড হয়নি</h1>
        <p className="mt-3 text-slate-600">{error}</p>
        <button
          type="button"
          onClick={refresh}
          className="mt-6 rounded-full bg-orange-600 px-5 py-3 font-semibold text-white"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!category || products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl font-black text-slate-900">৪০৪</h1>
        <p className="mt-4 text-xl text-slate-600">এই ক্যাটাগরিতে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
        <Link href="/" className="mt-6 inline-block rounded-full bg-orange-600 px-5 py-3 font-semibold text-white">
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">ক্যাটাগরি</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">
            {category.icon} {category.label}
          </h1>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
          <label htmlFor="price-sort" className="text-sm font-medium text-slate-600">সাজান</label>
          <select
            id="price-sort"
            value={sortMode}
            onChange={(event) => {
              const value = event.target.value;
              if (value === "default" || value === "asc" || value === "desc") {
                setSortMode(value);
              }
            }}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      {products.length ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <h2 className="text-2xl font-black text-slate-800">কোন পণ্য পাওয়া যায়নি</h2>
          <p className="mt-2 text-slate-500">এই বিভাগে এখনো কোনো পণ্য নেই।</p>
          <Link href="/" className="mt-6 inline-block rounded-full bg-orange-600 px-5 py-3 font-semibold text-white">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      )}
    </div>
  );
}

function CategoryLoadingFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12" role="status" aria-label="ক্যাটাগরির পণ্য লোড হচ্ছে">
      <div className="mb-8 h-9 w-48 animate-pulse rounded bg-slate-200" />
      <ProductGridSkeleton />
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<CategoryLoadingFallback />}>
      <CategoryContent />
    </Suspense>
  );
}
