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
    return <div className="mx-auto max-w-6xl px-4 py-10"><div className="mb-6 h-24 animate-pulse rounded-2xl bg-slate-200" /><ProductGridSkeleton /></div>;
  }

  if (error) {
    return (
      <div role="alert" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-slate-900">বাজারের তথ্য লোড হয়নি</h1>
        <p className="mt-3 text-slate-600">{error}</p>
        <button type="button" onClick={refresh} className="mt-6 rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white">আবার চেষ্টা করুন</button>
      </div>
    );
  }

  if (!category || products.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-4xl font-black text-slate-900">৪০৪</h1>
        <p className="mt-4 text-xl text-slate-600">এই ক্যাটাগরিতে কোনো পণ্য খুঁজে পাওয়া যায়নি।</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white">হোম পেজে ফিরে যান</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      <section className="flex items-center gap-4 rounded-2xl border border-[#dce7dd] bg-[#f9fcf9] p-5 sm:p-6">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ee] text-3xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-black text-[#202b23] md:text-3xl">{category.label}</h1>
          <p className="mt-1 text-sm text-slate-500">{products.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </section>

      <section className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#dce7dd] bg-[#f9fcf9] px-5 py-4">
        <p className="text-sm text-slate-600">মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        <div className="flex items-center gap-3">
          <label htmlFor="price-sort" className="text-sm font-medium text-slate-600">সাজান</label>
          <select id="price-sort" value={sortMode} onChange={(event) => {
            const value = event.target.value;
            if (value === "default" || value === "asc" || value === "desc") setSortMode(value);
          }} className="rounded-lg border border-[#cfdccf] bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-emerald-700">
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </section>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
}

function CategoryLoadingFallback() {
  return <div className="mx-auto max-w-6xl px-4 py-10" role="status" aria-label="ক্যাটাগরির পণ্য লোড হচ্ছে"><div className="mb-6 h-24 animate-pulse rounded-2xl bg-slate-200" /><ProductGridSkeleton /></div>;
}

export default function CategoryPage() {
  return <Suspense fallback={<CategoryLoadingFallback />}><CategoryContent /></Suspense>;
}
