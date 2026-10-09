import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/auth-provider";
import { Footer } from "@/components/footer";
import { MarketDataProvider } from "@/components/market-data-provider";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "বাজার দর | Bazar Dor",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর ও বাজারভিত্তিক মূল্য তুলনা করুন।",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="bn">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <AuthProvider>
          <MarketDataProvider>
            <div className="min-h-screen bg-slate-50">
              <Navbar />
              <main className="min-h-[70vh]">{children}</main>
              <Footer />
            </div>
          </MarketDataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
