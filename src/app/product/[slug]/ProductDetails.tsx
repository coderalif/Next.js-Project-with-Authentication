"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";

import { useAuth } from "@/components/auth-provider";
import { useMarketData } from "@/components/market-data-provider";
import { formatPercent, formatPrice } from "@/data/products";

export default function ProductDetails() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { isLoggedIn, loading: authLoading } = useAuth();
  const { products, loading: dataLoading, error, refresh } = useMarketData();
  const notified = useRef(false);
  const product = products.find((item) => item.slug === params.slug);

  useEffect(() => {
    if (authLoading || isLoggedIn || notified.current) return;
    notified.current = true;
    toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।");
    router.replace(`/signin?returnTo=${encodeURIComponent(`/product/${params.slug}`)}`);
  }, [authLoading, isLoggedIn, params.slug, router]);

  const priceSummary = useMemo(() => {
    if (!product || product.markets.length === 0) return null;
    const allPrices = product.markets.flatMap((market) => [
      market.min,
      market.max,
    ]);
    const min = Math.min(...allPrices);
    const max = Math.max(...allPrices);
    const average =
      product.markets.reduce(
        (total, market) => total + (market.min + market.max) / 2,
        0,
      ) / product.markets.length;
    return { min, max, average };
  }, [product]);

  if (authLoading || !isLoggedIn) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-16">
        <div className="h-72 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="mx-auto max-w-6xl animate-pulse px-4 py-16">
        <div className="h-72 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-2xl font-black text-slate-900">পণ্যের তথ্য লোড হয়নি</h1>
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

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm font-semibold text-orange-700">৪০৪ — পণ্য পাওয়া যায়নি</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">
          এই পণ্যের তথ্য আর পাওয়া যাচ্ছে না।
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-orange-600 px-5 py-3 font-semibold text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        ← সব পণ্যে ফিরে যান
      </Link>

      <section className="mt-5 rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 md:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-6xl shadow-sm">
            {product.emoji}
          </div>
          <div>
            <p className="text-sm font-semibold text-orange-700">{product.categoryLabel}</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-slate-600">{product.description}</p>
            <p className="mt-2 text-sm text-slate-500">{product.unit}</p>
          </div>
        </div>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200">
            আজকের দাম: {formatPrice(product.price)} টাকা
          </span>
          <span className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 ring-1 ring-slate-200">
            {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"}{" "}
            {formatPercent(Math.abs(product.change))}% পরিবর্তন
          </span>
        </div>
      </section>

      {priceSummary ? (
        <section className="mt-8">
          <h2 className="text-2xl font-black text-slate-900">দামের সংক্ষিপ্তসার</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {[
              ["সর্বনিম্ন দাম", priceSummary.min],
              ["গড় বাজারদর", priceSummary.average],
              ["সর্বোচ্চ দাম", priceSummary.max],
            ].map(([label, price]) => (
              <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {formatPrice(Number(price))} টাকা
                </p>
                <p className="mt-1 text-xs text-slate-500">{product.unit}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-2xl font-black text-slate-900">বাজারভিত্তিক আজকের দাম</h2>
          <p className="mt-1 text-sm text-slate-500">
            বিভিন্ন বাজারে পণ্যটির সর্বনিম্ন ও সর্বোচ্চ বিক্রয়মূল্য
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600 sm:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <span>বাজার</span>
            <span>সর্বনিম্ন</span>
            <span>সর্বোচ্চ</span>
            <span className="hidden sm:block">বিভাগ</span>
          </div>
          {product.markets.map((market) => (
            <div
              key={`${market.market}-${market.division}`}
              className="grid grid-cols-[1fr_auto_auto] gap-4 border-t border-slate-100 px-4 py-4 text-sm sm:grid-cols-[1.4fr_1fr_1fr_1fr]"
            >
              <span className="font-medium text-slate-800">{market.market}</span>
              <span className="text-slate-700">{formatPrice(market.min)} টাকা</span>
              <span className="text-slate-700">{formatPrice(market.max)} টাকা</span>
              <span className="hidden text-slate-500 sm:block">{market.division}</span>
            </div>
          ))}
        </div>
      </section>

      {product.yesterday !== undefined ? (
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-bold text-slate-900">আগের দামের সঙ্গে তুলনা</h2>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
            <p className="text-slate-600">
              গতকাল: <strong className="text-slate-900">{formatPrice(product.yesterday)} টাকা</strong>
            </p>
            {product.lastWeek !== undefined ? (
              <p className="text-slate-600">
                গত সপ্তাহ: <strong className="text-slate-900">{formatPrice(product.lastWeek)} টাকা</strong>
              </p>
            ) : null}
            {product.lastMonth !== undefined ? (
              <p className="text-slate-600">
                গত মাস: <strong className="text-slate-900">{formatPrice(product.lastMonth)} টাকা</strong>
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}

