"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import { useAuth } from "@/components/auth-provider";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { user, updateProfile, loading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      toast.error("তথ্য আপডেট করতে আগে সাইন ইন করুন।");
      router.replace("/signin?returnTo=%2Fprofile%2Fupdate");
    }
  }, [isLoggedIn, loading, router]);

  if (loading || !isLoggedIn || !user) {
    return (
      <div className="mx-auto max-w-2xl animate-pulse px-4 py-16">
        <div className="h-64 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <ProfileNameForm
      initialName={user.name}
      updateProfile={updateProfile}
    />
  );
}

function ProfileNameForm({
  initialName,
  updateProfile,
}: {
  initialName: string;
  updateProfile: (name: string) => Promise<string | null>;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("নাম লিখুন।");
      return;
    }

    setPending(true);
    const error = await updateProfile(trimmedName);
    setPending(false);
    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    toast.success("আপনার তথ্য আপডেট হয়েছে।");
    router.push("/profile");
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/profile" className="text-sm font-semibold text-orange-700 hover:underline">
          ← প্রোফাইলে ফিরে যান
        </Link>
        <h1 className="mt-5 text-3xl font-black text-slate-900">তথ্য আপডেট করুন</h1>
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div>
            <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-slate-700">
              নাম
            </label>
            <input
              id="profile-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500"
              minLength={2}
              required
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="rounded-xl bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-500 disabled:cursor-wait disabled:opacity-60"
          >
            {pending ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}
          </button>
        </form>
      </div>
    </div>
  );
}
