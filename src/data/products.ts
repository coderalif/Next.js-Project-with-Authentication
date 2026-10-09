export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  description: string;
  markets: MarketPrice[];
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
};

export type Category = {
  slug: string;
  label: string;
  icon: string;
};

type ApiProduct = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  yesterday?: number;
  lastWeek?: number;
  lastMonth?: number;
  change: { pct: number };
  markets: MarketPrice[];
};

type ApiCategory = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

function getApiItems(payload: unknown, label: string): unknown[] {
  if (Array.isArray(payload)) return payload;

  if (
    payload !== null &&
    typeof payload === "object" &&
    "value" in payload &&
    Array.isArray(payload.value)
  ) {
    return payload.value;
  }

  throw new Error(`${label} API থেকে সঠিক তথ্য পাওয়া যায়নি।`);
}

const unitLabels: Record<string, string> = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  piece: "প্রতি পিস",
  dozen: "প্রতি ডজন",
  maund: "প্রতি মণ",
};

export function normalizeProducts(payload: unknown): Product[] {
  return getApiItems(payload, "পণ্য").map((entry) => {
    if (entry === null || typeof entry !== "object") {
      throw new Error("পণ্যের API-তে অসম্পূর্ণ তথ্য রয়েছে।");
    }

    const item = entry as ApiProduct;
    if (
      typeof item.id !== "number" ||
      typeof item.slug !== "string" ||
      typeof item.nameBn !== "string" ||
      typeof item.category !== "string" ||
      typeof item.categoryNameBn !== "string" ||
      typeof item.unit !== "string" ||
      typeof item.today !== "number" ||
      !Array.isArray(item.markets)
    ) {
      throw new Error("পণ্যের API-তে অসম্পূর্ণ তথ্য রয়েছে।");
    }

    return {
      id: item.id,
      slug: item.slug,
      name: item.nameBn,
      category: item.category,
      categoryLabel: item.categoryNameBn,
      emoji: item.image || item.categoryIcon || "🛒",
      unit: unitLabels[item.unit] || `প্রতি ${item.unit}`,
      price: item.today,
      change: item.change?.pct ?? 0,
      description: `${item.nameBn} পণ্যের আজকের বাজারদর ও বিভিন্ন এলাকার মূল্যতথ্য দেখে নিন।`,
      markets: item.markets,
      yesterday: item.yesterday,
      lastWeek: item.lastWeek,
      lastMonth: item.lastMonth,
    };
  });
}

export function normalizeCategories(payload: unknown): Category[] {
  return getApiItems(payload, "ক্যাটাগরি").map((entry) => {
    if (entry === null || typeof entry !== "object") {
      throw new Error("ক্যাটাগরির API-তে অসম্পূর্ণ তথ্য রয়েছে।");
    }

    const item = entry as ApiCategory;
    if (typeof item.slug !== "string" || typeof item.nameBn !== "string") {
      throw new Error("ক্যাটাগরির API-তে অসম্পূর্ণ তথ্য রয়েছে।");
    }

    return { slug: item.slug, label: item.nameBn, icon: item.icon || "🛒" };
  });
}

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 0 }).format(value);

export const formatPercent = (value: number) =>
  new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
