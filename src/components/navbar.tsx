"use client";
import { Suspense } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/components/auth-provider";
import { useMarketData } from "@/components/market-data-provider";
import { formatPercent, formatPrice } from "@/data/products";

function NavbarContent() {
  const { user, isLoggedIn, logout, loading: authLoading } = useAuth();
  const { categories, products } = useMarketData();
  const pathname = usePathname();
  const tickerItems = products.slice(0, 8);
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const formattedDate = new Intl.DateTimeFormat("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date());
      setCurrentDate(formattedDate);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <Link href="/" className="text-2xl font-black text-slate-900">
              🛒 বাজার দর
            </Link>
            <p className="text-xs text-slate-500">{currentDate}</p>
          </div>

          <div className="flex items-center gap-2">
            {authLoading ? (
              <div
                className="h-10 w-24 animate-pulse rounded-full bg-slate-100"
                aria-label="অ্যাকাউন্ট লোড হচ্ছে"
              />
            ) : isLoggedIn ? (
              <>
                <Link href="/profile" className="rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700">
                  {user?.name || "Profile"}
                </Link>
                <button
                  type="button"
                  className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                  onClick={() => void logout()}
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="rounded-full bg-orange-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-500">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="mt-3 flex gap-2 overflow-x-auto border-t border-slate-200 pt-3"
        >
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              aria-current={pathname === `/category/${category.slug}` ? "page" : undefined}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium ${
                pathname === `/category/${category.slug}`
                  ? "bg-orange-100 text-orange-800"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="ticker overflow-hidden border-y border-slate-200 bg-slate-50">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap px-4 py-2 text-sm text-slate-700">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item.slug}-${index}`} className="flex items-center gap-2">
              <span>{item.emoji}</span>
              <span>{item.name}</span>
              <span>{formatPrice(item.price)} টাকা/{item.unit.replace("প্রতি ", "")}</span>
              <span
                className={
                  item.change > 0
                    ? "text-emerald-600"
                    : item.change < 0
                      ? "text-rose-600"
                      : "text-slate-500"
                }
              >
                {item.change > 0 ? "▲" : item.change < 0 ? "▼" : "—"} {formatPercent(Math.abs(item.change))}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={<div className="px-4 py-3 text-sm text-slate-500">লোড হচ্ছে...</div>}>
      <NavbarContent />
    </Suspense>
  );
}
