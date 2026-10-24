"use client";

import { toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

export function SocialLoginButtons() {
  const signIn = async (provider: "google" | "github") => {
    try {
      const returnTo = new URLSearchParams(window.location.search).get("returnTo");
      // Social callback-এও একই-site path-ই রাখি, যাতে open redirect না হয়।
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
          aria-label="Google দিয়ে চালিয়ে যান"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-2 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f1f6f1] sm:px-3"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
            <path
              fill="#4285F4"
              d="M21.35 12.23c0-.72-.06-1.41-.18-2.08H12v3.94h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.25Z"
            />
            <path
              fill="#34A853"
              d="M12 21.75c2.63 0 4.84-.87 6.45-2.27l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.71-5.46-4.02H3.3v2.52A9.75 9.75 0 0 0 12 21.75Z"
            />
            <path
              fill="#FBBC05"
              d="M6.54 13.93a5.86 5.86 0 0 1 0-3.86V7.55H3.3a9.75 9.75 0 0 0 0 8.9l3.24-2.52Z"
            />
            <path
              fill="#EA4335"
              d="M12 6.05c1.43 0 2.71.49 3.72 1.48l2.79-2.79C16.83 3.19 14.63 2.25 12 2.25A9.75 9.75 0 0 0 3.3 7.55l3.24 2.52C7.31 7.76 9.46 6.05 12 6.05Z"
            />
          </svg>
          <span>Google দিয়ে চালিয়ে যান</span>
        </button>
        <button
          type="button"
          onClick={() => void signIn("github")}
          aria-label="GitHub দিয়ে চালিয়ে যান"
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-2 py-3 text-sm font-semibold text-slate-700 hover:bg-[#f1f6f1] sm:px-3"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-[#24292f]">
            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.68-3.76-1.32-3.76-1.32-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1 1.53-.78 1.53-.78.1-.72.39-1.2.71-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.99 0 4.29-2.62 5.23-5.11 5.51.4.35.76 1.03.76 2.08v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
          </svg>
          <span>GitHub দিয়ে চালিয়ে যান</span>
        </button>
      </div>
    </div>
  );
}
