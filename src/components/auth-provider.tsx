"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { Toaster, toast } from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<string | null>;
  logout: () => Promise<boolean>;
  updateProfile: (name: string) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const session = authClient.useSession();
  const user = session.data?.user
    ? { name: session.data.user.name, email: session.data.user.email }
    : null;

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      loading: session.isPending,
      async login(email, password) {
        try {
          const result = await authClient.signIn.email({ email, password });
          return result.error?.message ?? null;
        } catch {
          return "সাইন ইন সার্ভারে সংযোগ করা যায়নি।";
        }
      },
      async register(name, email, password) {
        try {
          const result = await authClient.signUp.email({ name, email, password });
          return result.error?.message ?? null;
        } catch {
          return "রেজিস্ট্রেশন সার্ভারে সংযোগ করা যায়নি।";
        }
      },
      async logout() {
        try {
          const result = await authClient.signOut();
          if (result.error) {
            toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
            return false;
          }
          toast.success("আপনি সাইন আউট করেছেন।");
          return true;
        } catch {
          toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
          return false;
        }
      },
      async updateProfile(name) {
        try {
          const result = await authClient.updateUser({ name });
          return result.error?.message ?? null;
        } catch {
          return "প্রোফাইল সার্ভারে সংযোগ করা যায়নি।";
        }
      },
    }),
    [user, session.isPending],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3500,
          style: { borderRadius: "14px", fontFamily: "Arial, sans-serif" },
        }}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
