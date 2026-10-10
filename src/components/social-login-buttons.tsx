"use client";

import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export function SocialLoginButtons() {
  const signIn = async (provider: "google" | "github") => {
    try {
      const returnTo = new URLSearchParams(window.location.search).get("returnTo");
      const callbackURL =
        returnTo?.startsWith("/") && !returnTo.startsWith("//") ? returnTo : "/";
      const result = await authClient.signIn.social({
        provider,
        callbackURL,
      });
      if (!result.error) return;
      toast.error(
        provider === "google"
          ? "Google সাইন ইন সেটআপ করা নেই বা ব্যর্থ হয়েছে।"
          : "GitHub সাইন ইন সেটআপ করা নেই বা ব্যর্থ হয়েছে।",
      );
    } catch {
      toast.error(
        provider === "google"
          ? "Google সাইন ইন সেটআপ করা নেই বা ব্যর্থ হয়েছে।"
          : "GitHub সাইন ইন সেটআপ করা নেই বা ব্যর্থ হয়েছে।",
      );
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative py-1 text-center text-xs text-slate-500">
        <span className="bg-white px-3">অথবা সোশ্যাল অ্যাকাউন্ট দিয়ে</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => void signIn("google")}
          className="rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f1f6f1]"
        >
          Google
        </button>
        <button
          type="button"
          onClick={() => void signIn("github")}
          className="rounded-xl border border-slate-300 px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f1f6f1]"
        >
          GitHub
        </button>
      </div>
    </div>
  );
}
