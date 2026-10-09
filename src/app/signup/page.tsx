"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { useAuth } from "@/components/auth-provider";
import { SocialLoginButtons } from "@/components/social-login-buttons";

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    const error = await register(name.trim(), email.trim(), password);
    setPending(false);
    if (error) {
      toast.error("অ্যাকাউন্ট তৈরি হয়নি। ইমেলটি আগে ব্যবহার করা হয়েছে কি না দেখুন।");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16">
      <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="flex flex-col justify-center rounded-2xl bg-slate-900 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">সাইন আপ</p>
          <h1 className="mt-4 text-3xl font-black">অ্যাকাউন্ট তৈরি করুন</h1>
          <p className="mt-3 text-slate-300">
            বাজার দর-এ যাওয়ার জন্য আপনার ডেটা দিন।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h2 className="text-2xl font-black text-slate-900">সাইন আপ</h2>
            <p className="mt-1 text-sm text-slate-500">নতুন অ্যাকাউন্ট তৈরি করুন</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="আপনার নাম"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">ইমেল</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              placeholder="••••••••"
              minLength={8}
              required
            />
            <p className="mt-1 text-xs text-slate-500">কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড দিন।</p>
          </div>

          <button disabled={pending} type="submit" className="w-full rounded-xl bg-orange-600 px-4 py-3 font-semibold text-white hover:bg-orange-500 disabled:cursor-wait disabled:opacity-60">
            {pending ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "রেজিস্টার"}
          </button>

          <SocialLoginButtons />

          <p className="text-center text-sm text-slate-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে? {" "}
            <Link href="/signin" className="font-semibold text-orange-600">
              লগইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
