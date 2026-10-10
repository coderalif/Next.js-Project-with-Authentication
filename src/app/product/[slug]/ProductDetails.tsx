"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";

import { AuthSessionNotice, useAuth } from "@/components/auth-provider";
import { useMarketData } from "@/components/market-data-provider";
import { formatPercent, formatPrice } from "@/data/products";

export default function ProductDetails() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { isLoggedIn, loading: authLoading, sessionError } = useAuth();
  const { products, loading: dataLoading, error, refresh } = useMarketData();
  const notified = useRef(false);
  const product = products.find((item) => item.slug === params.slug);

  useEffect(() => {
    if (authLoading || sessionError || isLoggedIn || notified.current) return;
    notified.current = true;
    toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।");
    router.replace(`/signin?returnTo=${encodeURIComponent(`/product/${params.slug}`)}`);
  }, [authLoading, isLoggedIn, params.slug, router, sessionError]);

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

  if (sessionError) return <AuthSessionNotice />;

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
          className="mt-6 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-sm font-semibold text-emerald-700">৪০৪ — পণ্য পাওয়া যায়নি</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">
          এই পণ্যের তথ্য আর পাওয়া যাচ্ছে না।
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/" className="hover:text-emerald-800">হোম</Link><span aria-hidden="true">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-emerald-800">{product.categoryLabel}</Link><span aria-hidden="true">/</span>
        <span className="text-slate-700">{product.name}</span>
      </nav>

      <section className="mt-5 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-6 md:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white text-6xl shadow-sm">
            {product.emoji}
          </div>
          <div>
            <p className="text-sm font-semibold text-emerald-700">{product.categoryLabel}</p>
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
        <div className="overflow-x-auto rounded-2xl border border-[#dce7dd] bg-[#fbfdfb]">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-[#f0f6f0] text-slate-600"><tr>
              <th scope="col" className="px-4 py-3 font-semibold">বাজার</th>
              <th scope="col" className="px-4 py-3 font-semibold">বিভাগ</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">সর্বনিম্ন দাম</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">সর্বোচ্চ দাম</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">গড় দাম</th>
            </tr></thead>
            <tbody>{product.markets.map((market) => (
              <tr key={`${market.market}-${market.division}`} className="border-t border-[#e3ebe3] odd:bg-[#fbfdfb] even:bg-[#f4f8f4]">
                <th scope="row" className="px-4 py-3.5 font-medium text-slate-800">{market.market}</th>
                <td className="px-4 py-3.5 text-slate-600">{market.division}</td>
                <td className="px-4 py-3.5 text-right text-slate-700">{formatPrice(market.min)} টাকা</td>
                <td className="px-4 py-3.5 text-right text-slate-700">{formatPrice(market.max)} টাকা</td>
                <td className="px-4 py-3.5 text-right font-semibold text-slate-800">{formatPrice((market.min + market.max) / 2)} টাকা</td>
              </tr>
            ))}</tbody>
          </table>
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

