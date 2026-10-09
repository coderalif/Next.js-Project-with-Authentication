"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { useAuth } from "@/components/auth-provider";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoggedIn, loading } = useAuth();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন।");
      router.replace("/signin?returnTo=%2Fprofile");
    }
  }, [isLoggedIn, loading, router]);

  if (loading || !isLoggedIn || !user) {
    return (
      <div className="mx-auto max-w-4xl animate-pulse px-4 py-16">
        <div className="h-64 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  const handleLogout = async () => {
    if (await logout()) router.push("/");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          আমার প্রোফাইল
        </p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">{user.name}</h1>
        <p className="mt-2 text-slate-600">{user.email}</p>

        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <Link
            href="/profile/update"
            className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-500"
          >
            তথ্য আপডেট করুন
          </Link>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
