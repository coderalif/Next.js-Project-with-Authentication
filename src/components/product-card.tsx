import Link from "next/link";

import { formatPercent, formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const changeClass = product.change > 0
    ? "text-rose-600"
    : product.change < 0
      ? "text-emerald-700"
      : "text-slate-500";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-[#dce7dd] bg-[#fbfdfb] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#f0f6f0] text-2xl" aria-hidden="true">
          {product.emoji}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-base font-bold text-[#202b23] group-hover:text-emerald-800">{product.name}</span>
          <span className="mt-0.5 block text-xs text-slate-500">{product.unit}</span>
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <span>
          <span className="block text-xs text-slate-500">আজকের দাম</span>
          <span className="mt-0.5 block text-xl font-extrabold leading-7 text-[#202b23]">
            {formatPrice(product.price)} <span className="text-sm font-medium">টাকা</span>
          </span>
        </span>
        <span className={`mb-0.5 rounded-full bg-[#f0f5f0] px-2.5 py-1 text-xs font-semibold ${changeClass}`}>
          {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"} {formatPercent(Math.abs(product.change))}%
        </span>
      </div>
    </Link>
  );
}
