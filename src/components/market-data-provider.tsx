"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  normalizeCategories,
  normalizeProducts,
  type Category,
  type Product,
} from "@/data/products";

type MarketDataValue = {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
};

const MarketDataContext = createContext<MarketDataValue | null>(null);

async function loadMarketData() {
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetch("/api/products"),
    fetch("/api/categories"),
  ]);

  if (!productsResponse.ok || !categoriesResponse.ok) {
    throw new Error("বাজারের তথ্য লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।");
  }

  const [productsJson, categoriesJson] = await Promise.all([
    productsResponse.json(),
    categoriesResponse.json(),
  ]);

  return {
    products: normalizeProducts(productsJson),
    categories: normalizeCategories(categoriesJson),
  };
}

export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [request, setRequest] = useState(0);

  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    setRequest((value) => value + 1);
  }, []);

  useEffect(() => {
    let active = true;

    loadMarketData()
      .then((data) => {
        if (!active) return;
        setProducts(data.products);
        setCategories(data.categories);
      })
      .catch((cause: unknown) => {
        if (!active) return;
        setError(
          cause instanceof Error
            ? cause.message
            : "বাজারের তথ্য লোড করার সময় সমস্যা হয়েছে।",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [request]);

  const value = useMemo(
    () => ({ products, categories, loading, error, refresh }),
    [products, categories, loading, error, refresh],
  );

  return (
    <MarketDataContext.Provider value={value}>
      {children}
    </MarketDataContext.Provider>
  );
}

export function useMarketData() {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error("useMarketData must be used inside MarketDataProvider");
  }
  return context;
}
