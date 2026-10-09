roject ta tik kopro
import Link from "next/link";

import { formatPercent, formatPrice, type Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  const badgeClass =
    product.change > 0
      ? "bg-emerald-100 text-emerald-700"
      : product.change < 0
        ? "bg-rose-100 text-rose-700"
        : "bg-slate-100 text-slate-600";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-slate-100 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-2xl">
            {product.emoji}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            <p className="text-xs text-slate-500">{product.unit}</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
          <span>আজকের দাম</span>
          <span className={`${badgeClass} rounded-full px-2 py-1 font-medium`}>
            {product.change > 0 ? "▲" : product.change < 0 ? "▼" : "—"} {formatPercent(Math.abs(product.change))}%
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-900">{formatPrice(product.price)} টাকা</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
