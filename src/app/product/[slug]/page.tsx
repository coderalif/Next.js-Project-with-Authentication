import { Suspense } from "react";
import ProductDetails from "./ProductDetails";

export default function ProductDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-16" role="status">
          লোড হচ্ছে...
        </div>
      }
    >
      <ProductDetails />
    </Suspense>
  );
}
