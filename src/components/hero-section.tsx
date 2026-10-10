"use client";

import Link from "next/link";
import { useMarketData } from "@/components/market-data-provider";

export function HeroSection() {
  const { products } = useMarketData();
  const marketCount = new Set(products.flatMap((product) => product.markets.map((market) => market.market))).size;
  const divisionCount = new Set(products.flatMap((product) => product.markets.map((market) => market.division))).size;

  return (
    <section className="mx-auto max-w-6xl px-4 py-7 md:py-10">
      <div className="grid items-center gap-5 rounded-3xl border border-[#dce7dd] bg-[#f9fcf9] p-5 shadow-sm sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:p-10">
        <div>
          <p className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
            প্রতিদিনের বাজারদর, এক জায়গায়
          </p>
          <h1 className="max-w-xl text-3xl font-black leading-tight tracking-tight text-[#1f2a22] md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#সব-পণ্য" className="rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">
              সব পণ্যের দাম দেখুন
            </a>
            <Link href="/category/chal" className="rounded-lg border border-[#bdcdbf] bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:border-emerald-700 hover:text-emerald-800">
              ⚖️ বাজার তুলনা
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <svg viewBox="0 0 440 360" role="img" aria-labelledby="market-illustration-title" className="h-auto w-full drop-shadow-sm">
            <title id="market-illustration-title">বাজারের তাজা পণ্য ও দৈনিক দামের চিত্র</title>
            <circle cx="220" cy="180" r="158" fill="#e6f2e8" />
            <circle cx="220" cy="180" r="128" fill="#f5faf5" />
            <ellipse cx="220" cy="279" rx="137" ry="17" fill="#dce8dd" />
            <path d="M83 255c0-11 9-20 20-20h234c11 0 20 9 20 20v18H83z" fill="#b7d9bf" />
            <path d="M126 170h188l-18 121H144z" fill="#15803d" />
            <path d="M154 171c0-46 25-78 66-78s66 32 66 78" fill="none" stroke="#166534" strokeWidth="12" strokeLinecap="round" />
            <path d="M143 190h154l-13 86H156z" fill="#16a34a" />
            <path d="M156 205h128M159 226h122M162 247h116" stroke="#86c99a" strokeWidth="8" strokeLinecap="round" />
            <path d="M183 169c-18-35-12-63 12-83 20 28 19 56-12 83z" fill="#16a34a" />
            <path d="M220 166c-5-39 11-64 41-72 7 35-6 60-41 72z" fill="#15803d" />
            <path d="M247 171c9-34 32-50 62-44-7 31-28 48-62 44z" fill="#22c55e" />
            <path d="M188 178l-2-77M223 174l19-69M251 176l41-42" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
            <circle cx="150" cy="157" r="27" fill="#facc15" /><circle cx="150" cy="157" r="21" fill="#fde047" />
            <path d="M149 133c2-8 9-12 16-10-2 8-8 12-16 10z" fill="#15803d" />
            <ellipse cx="292" cy="158" rx="24" ry="30" fill="#dc2626" />
            <path d="M290 128c4-9 11-11 17-8-3 7-9 10-17 8z" fill="#15803d" />
            <rect x="72" y="63" width="139" height="61" rx="15" fill="white" />
            <text x="89" y="87" fill="#64748b" fontSize="11" fontFamily="sans-serif">আজকের পণ্যের তথ্য</text>
            <text x="89" y="110" fill="#166534" fontSize="18" fontWeight="700" fontFamily="sans-serif">{products.length}টি পণ্য</text>
            <rect x="270" y="238" width="125" height="60" rx="15" fill="white" />
            <circle cx="290" cy="257" r="6" fill="#16a34a" />
            <text x="303" y="261" fill="#64748b" fontSize="11" fontFamily="sans-serif">বাজার পর্যবেক্ষণ</text>
            <text x="286" y="282" fill="#166534" fontSize="14" fontWeight="700" fontFamily="sans-serif">প্রতিদিন আপডেট</text>
          </svg>
          <div className="absolute bottom-0 left-0 rounded-xl border border-[#dce7dd] bg-white/95 px-3 py-2 text-xs text-slate-600 shadow-sm">
            {marketCount}টি বাজার <span className="mx-1 text-emerald-700">•</span> {divisionCount}টি বিভাগ
          </div>
        </div>
      </div>
    </section>
  );
}
