import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700">
        ৪০৪ — পেজ পাওয়া যায়নি
      </p>
      <h1 className="mt-3 text-3xl font-black text-slate-900">
        আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি এখানে নেই।
      </h1>
      <p className="mt-3 text-slate-600">
        ঠিকানা যাচাই করুন অথবা বাজারের পণ্যের তালিকায় ফিরে যান।
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-500"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
