"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

import { AuthSessionNotice, useAuth } from "@/components/auth-provider";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoggedIn, loading, sessionError } = useAuth();

  useEffect(() => {
    if (!loading && !sessionError && !isLoggedIn) {
      toast.error("প্রোফাইল দেখতে আগে সাইন ইন করুন।");
      router.replace("/signin?returnTo=%2Fprofile");
    }
  }, [isLoggedIn, loading, router, sessionError]);

  if (sessionError) return <AuthSessionNotice />;
  if (loading || !isLoggedIn || !user) {
    return <div className="mx-auto max-w-3xl animate-pulse px-4 py-16"><div className="h-56 rounded-3xl bg-slate-200" /></div>;
  }

  const handleLogout = async () => {
    if (await logout()) router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <header className="mb-6">
        <p className="text-sm font-semibold text-emerald-800">আপনার অ্যাকাউন্ট</p>
        <h1 className="mt-1 text-3xl font-black text-[#202b23]">আমার প্রোফাইল</h1>
        <p className="mt-2 text-sm text-slate-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও আপডেট করুন।</p>
      </header>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dce7dd] bg-[#fbfdfb] p-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#edf5ee] text-2xl font-bold text-emerald-800">{user.name.trim().slice(0, 1)}</span>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-slate-900">{user.name}</p>
            <p className="truncate text-sm text-slate-500">{user.email}</p>
          </div>
        </div>
        <button type="button" onClick={() => void handleLogout()} className="rounded-lg border border-rose-200 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50">সাইন আউট</button>
      </section>

      <section className="mt-5 rounded-2xl border border-[#dce7dd] bg-[#fbfdfb] p-5 sm:p-6">
        <h2 className="text-lg font-bold text-[#202b23]">অ্যাকাউন্টের তথ্য</h2>
        <dl className="mt-4 divide-y divide-[#e6eee6]">
          <div className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-sm text-slate-500">নাম</dt><dd className="text-sm font-medium text-slate-800">{user.name}</dd></div>
          <div className="flex flex-wrap justify-between gap-2 py-3"><dt className="text-sm text-slate-500">ইমেইল</dt><dd className="text-sm font-medium text-slate-800">{user.email}</dd></div>
        </dl>
        <Link href="/profile/update" className="mt-5 inline-flex rounded-lg bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800">তথ্য আপডেট করুন</Link>
      </section>
    </div>
  );
}
