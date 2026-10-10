"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/auth-provider";
import { useMarketData } from "@/components/market-data-provider";
import { formatPercent, formatPrice } from "@/data/products";

function NavbarContent() {
  const { user, isLoggedIn, logout, loading: authLoading } = useAuth();
  const { categories, products } = useMarketData();
  const pathname = usePathname();
  const tickerItems = products.slice(0, 8);
  const [currentDate, setCurrentDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    }).format(new Date());
    setCurrentDate(formattedDate);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#dce6dc] bg-[#f9fcf9]/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex min-h-[68px] items-center justify-between gap-3 py-2">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 text-slate-900">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-xl text-white shadow-sm">🛒</span>
            <span>
              <span className="block text-xl font-black leading-tight">বাজার দর</span>
              <span className="block text-[11px] leading-4 text-slate-500">{currentDate}</span>
            </span>
          </Link>

          <div className="relative flex shrink-0 items-center gap-2">
            {authLoading ? (
              <div className="h-9 w-24 animate-pulse rounded-full bg-emerald-50" aria-label="অ্যাকাউন্ট লোড হচ্ছে" />
            ) : isLoggedIn ? (
              <>
                <button
                  type="button"
                  aria-expanded={menuOpen}
                  aria-haspopup="menu"
                  onClick={() => setMenuOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium text-slate-800 hover:bg-emerald-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-800">
                    {(user?.name || "আ").trim().slice(0, 1)}
                  </span>
                  <span className="hidden max-w-32 truncate sm:block">{user?.name || "প্রোফাইল"}</span>
                  <span aria-hidden="true" className="text-xs text-slate-500">⌄</span>
                </button>
                {menuOpen ? (
                  <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-[#dce6dc] bg-white p-2 shadow-xl">
                    <div className="border-b border-slate-100 px-3 py-2.5">
                      <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
                      <p className="truncate text-xs text-slate-500">{user?.email}</p>
                    </div>
                    <Link role="menuitem" href="/profile" onClick={() => setMenuOpen(false)} className="mt-1 block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-emerald-50">আমার প্রোফাইল</Link>
                    <button role="menuitem" type="button" onClick={() => { setMenuOpen(false); void logout(); }} className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-rose-700 hover:bg-rose-50">সাইন আউট</button>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                <Link href="/signin" className="rounded-full border border-[#cfdccf] px-3 py-2 text-sm font-semibold text-slate-700 hover:border-emerald-700 hover:text-emerald-800">সাইন ইন</Link>
                <Link href="/signup" className="rounded-full bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800">সাইন আপ</Link>
              </>
            )}
          </div>
        </div>

        <nav aria-label="পণ্যের ক্যাটাগরি" className="flex gap-1 overflow-x-auto border-t border-[#e6eee6] py-2">
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;
            return (
              <Link key={category.slug} href={`/category/${category.slug}`} aria-current={active ? "page" : undefined} className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition ${active ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-emerald-50"}`}>
                <span className="mr-1.5">{category.icon}</span>{category.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="ticker overflow-hidden border-y border-[#e0e9e0] bg-[#f4f8f4]">
        <div className="flex w-max animate-marquee gap-0 whitespace-nowrap text-sm text-slate-700">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div key={`${item.slug}-${index}`} className="flex items-center gap-2 border-r border-[#e0e9e0] px-4 py-2">
              <span>{item.emoji}</span><span>{item.name}</span>
              <span>{formatPrice(item.price)} টাকা/{item.unit.replace("প্রতি ", "")}</span>
              <span className={item.change > 0 ? "font-semibold text-rose-600" : item.change < 0 ? "font-semibold text-emerald-700" : "text-slate-500"}>
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
  return <Suspense fallback={<div className="px-4 py-3 text-sm text-slate-500">লোড হচ্ছে...</div>}><NavbarContent /></Suspense>;
}
