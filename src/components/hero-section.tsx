"use client";

import Link from "next/link";

export function HeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="grid items-center gap-8 rounded-3xl border border-orange-100 bg-gradient-to-r from-orange-50 via-amber-50 to-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div>
          <p className="mb-4 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
            বাজার দর
          </p>
          <h1 className="max-w-lg text-4xl font-black leading-tight text-slate-900 md:text-5xl">
            প্রয়োজনীয় পণ্যের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            চাল, ডাল, তেল, শাকসবজি, মাছসহ নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বিভিন্ন বাজারের মূল্য তুলনা করুন।
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#সব-পণ্য"
              className="rounded-full bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-500"
            >
              সব পণ্যের দাম দেখুন
            </a>
            <Link
              href="/signup"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-slate-400"
            >
              সাইন আপ
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <svg
            viewBox="0 0 440 360"
            role="img"
            aria-labelledby="market-illustration-title"
            className="h-auto w-full drop-shadow-sm"
          >
            <title id="market-illustration-title">
              বাজারের তাজা পণ্য ও দৈনিক দামের চিত্র
            </title>
            <circle cx="220" cy="180" r="158" fill="#ffedd5" />
            <circle cx="220" cy="180" r="128" fill="#fff7ed" />
            <path d="M83 255c0-11 9-20 20-20h234c11 0 20 9 20 20v18H83z" fill="#fed7aa" />
            <path d="M126 170h188l-18 121H144z" fill="#c2410c" />
            <path d="M154 171c0-46 25-78 66-78s66 32 66 78" fill="none" stroke="#9a3412" strokeWidth="12" strokeLinecap="round" />
            <path d="M143 190h154l-13 86H156z" fill="#ea580c" />
            <path d="M156 205h128M159 226h122M162 247h116" stroke="#fdba74" strokeWidth="8" strokeLinecap="round" />
            <path d="M183 169c-18-35-12-63 12-83 20 28 19 56-12 83z" fill="#16a34a" />
            <path d="M220 166c-5-39 11-64 41-72 7 35-6 60-41 72z" fill="#15803d" />
            <path d="M247 171c9-34 32-50 62-44-7 31-28 48-62 44z" fill="#22c55e" />
            <path d="M188 178l-2-77M223 174l19-69M251 176l41-42" stroke="#166534" strokeWidth="4" strokeLinecap="round" />
            <circle cx="150" cy="157" r="27" fill="#facc15" />
            <circle cx="150" cy="157" r="21" fill="#fde047" />
            <path d="M149 133c2-8 9-12 16-10-2 8-8 12-16 10z" fill="#15803d" />
            <ellipse cx="292" cy="158" rx="24" ry="30" fill="#dc2626" />
            <path d="M290 128c4-9 11-11 17-8-3 7-9 10-17 8z" fill="#15803d" />
            <rect x="94" y="77" width="118" height="56" rx="15" fill="white" />
            <text x="110" y="99" fill="#64748b" fontSize="11" fontFamily="sans-serif">আজকের বাজারদর</text>
            <text x="110" y="120" fill="#0f172a" fontSize="17" fontWeight="700" fontFamily="sans-serif">সঠিক দামে বাজার</text>
            <rect x="275" y="237" width="111" height="58" rx="15" fill="white" />
            <circle cx="294" cy="256" r="6" fill="#16a34a" />
            <text x="307" y="260" fill="#64748b" fontSize="11" fontFamily="sans-serif">দামের আপডেট</text>
            <text x="292" y="281" fill="#15803d" fontSize="15" fontWeight="700" fontFamily="sans-serif">প্রতিদিন</text>
            <circle cx="343" cy="91" r="5" fill="#fb923c" />
            <circle cx="104" cy="213" r="4" fill="#f59e0b" />
          </svg>
        </div>
      </div>
    </section>
  );
}
