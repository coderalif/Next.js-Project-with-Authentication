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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না।");
      return;
    }
    setPending(true);
    const error = await register(name.trim(), email.trim(), password);
    setPending(false);
    if (error) {
      toast.error("অ্যাকাউন্ট তৈরি করা যায়নি। ইমেইলটি আগে ব্যবহার হয়েছে কি না দেখুন।");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।");
    router.push("/signin");
  };

  return (
    <div className="mx-auto max-w-md px-4 py-8 sm:py-10">
      <header className="mb-5 text-center">
        <p className="text-sm font-semibold text-emerald-800">বাজার দর</p>
        <h1 className="mt-2 text-3xl font-black text-[#202b23]">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-2 text-sm text-slate-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-[#dce7dd] bg-[#fbfdfb] p-5 shadow-sm sm:p-6">
        <div>
          <label htmlFor="signup-name" className="mb-1.5 block text-sm font-medium text-slate-700">নাম</label>
          <input id="signup-name" type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border border-[#d3dfd4] bg-white px-4 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="আপনার নাম" minLength={2} required />
        </div>
        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-slate-700">ইমেইল</label>
          <input id="signup-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-[#d3dfd4] bg-white px-4 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
          <input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-[#d3dfd4] bg-white px-4 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required />
        </div>
        <div>
          <label htmlFor="signup-confirm-password" className="mb-1.5 block text-sm font-medium text-slate-700">পাসওয়ার্ড নিশ্চিত করুন</label>
          <input id="signup-confirm-password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="w-full rounded-lg border border-[#d3dfd4] bg-white px-4 py-2.5 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100" placeholder="পাসওয়ার্ড আবার লিখুন" minLength={8} required />
        </div>
        <button disabled={pending} type="submit" className="w-full rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800 disabled:cursor-wait disabled:opacity-60">
          {pending ? "অ্যাকাউন্ট তৈরি হচ্ছে…" : "অ্যাকাউন্ট তৈরি করুন"}
        </button>
        <SocialLoginButtons />
        <p className="text-center text-sm text-slate-600">অ্যাকাউন্ট আছে? <Link href="/signin" className="font-semibold text-emerald-800 hover:underline">সাইন ইন করুন</Link></p>
      </form>
      <p className="mt-5 text-center"><Link href="/" className="text-sm text-slate-500 hover:text-emerald-800">← হোম পেজে ফিরে যান</Link></p>
    </div>
  );
}
