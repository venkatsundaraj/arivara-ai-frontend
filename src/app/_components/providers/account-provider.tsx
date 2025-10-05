"use client";
import { User } from "next-auth";
import { notFound } from "next/navigation";
import {
  FC,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSession } from "@/lib/auth-client";

interface AccountProviderProps {
  children: React.ReactNode;
}

export const AccountContext = createContext<{
  account: User;
  isLoading: boolean;
} | null>(null);

const AccountProvider = ({ children }: AccountProviderProps) => {
  const { data } = useSession();

  return (
    <AccountContext.Provider
      value={{ account: { ...data?.user }, isLoading: true }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) throw new Error("useAccount must be used within AccountProvider");
  return ctx;
}

export default AccountProvider;
