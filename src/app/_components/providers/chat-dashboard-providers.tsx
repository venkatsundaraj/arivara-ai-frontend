import { auth } from "@/lib/auth";
import { useSession } from "@/lib/auth-client";
import { getCurrentUser } from "@/lib/session";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ChatDashboardProvidersProps {
  children: React.ReactNode;
}

const ChatDashboardProviders = async ({
  children,
}: ChatDashboardProvidersProps) => {
  const session = await getCurrentUser();

  if (!session?.user) {
    notFound();
  }
  return <>{children}</>;
};

export default ChatDashboardProviders;
