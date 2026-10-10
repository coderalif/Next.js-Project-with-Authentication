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
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center rounded-2xl bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">সাইন ইন</p>
          <h1 className="mt-4 text-3xl font-black">স্বাগতম আবার!</h1>
          <p className="mt-3 text-slate-300">
            আপনার দরকারি বাজারদর দেখতে সাইন ইন করুন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-slate-900">সাইন ইন</h2>
            <p className="mt-1 text-sm text-slate-500">একাউন্টে প্রবেশ করুন</p>
          </div>

          <div>
            <label htmlFor="signin-email" className="mb-2 block text-sm font-medium text-slate-700">ইমেল</label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="signin-password" className="mb-2 block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
            <input
              id="signin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button disabled={pending} type="submit" className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-500 disabled:cursor-wait disabled:opacity-60">
            {pending ? "সাইন ইন হচ্ছে…" : "লগইন"}
          </button>

          <SocialLoginButtons />

          <p className="text-center text-sm text-slate-600">
            অ্যাকাউন্ট নেই? {" "}
            <Link href="/signup" className="font-semibold text-orange-600">
              সাইন আপ করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
