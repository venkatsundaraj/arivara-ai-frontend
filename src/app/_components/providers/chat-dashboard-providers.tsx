import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface ChatDashboardProvidersProps {
  children: React.ReactNode;
}

const ChatDashboardProviders = async ({
  children,
}: ChatDashboardProvidersProps) => {
  const session = await auth();

  if (!session?.user) {
    notFound();
  }
  return <>{children}</>;
};

export default ChatDashboardProviders;
