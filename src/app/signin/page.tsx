"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useAuth } from "@/components/auth-provider";
import { SocialLoginButtons } from "@/components/social-login-buttons";

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const error = await login(email.trim(), password);
    setPending(false);
    if (error) {
      toast.error(error);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    router.push(returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <header className="mb-6 text-center">
        <p className="text-sm font-semibold text-emerald-800">বাজার দর</p>
        <h1 className="mt-2 text-3xl font-black text-[#202b23]">সাইন ইন</h1>
        <p className="mt-2 text-sm text-slate-500">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে প্রবেশ করুন।</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-[#dce7dd] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
        <div>
          <label htmlFor="signin-email" className="mb-2 block text-sm font-medium text-slate-700">ইমেইল</label>
          <input id="signin-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-[#d3dfd4] bg-white px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="signin-password" className="mb-2 block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
          <input id="signin-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-[#d3dfd4] bg-white px-4 py-3 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="••••••••" required />
        </div>
        <button disabled={pending} type="submit" className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">
          {pending ? "সাইন ইন হচ্ছে…" : "সাইন ইন"}
        </button>
        <SocialLoginButtons />
        <p className="text-center text-sm text-slate-600">অ্যাকাউন্ট নেই? <Link href="/signup" className="font-semibold text-emerald-800 hover:underline">সাইন আপ করুন</Link></p>
      </form>
      <p className="mt-6 text-center"><Link href="/" className="text-sm text-slate-500 hover:text-emerald-800">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
