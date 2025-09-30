import AccountProvider from "@/app/_components/providers/account-provider";
import ChatDashboardProviders from "@/app/_components/providers/chat-dashboard-providers";
import Hello from "@/app/_components/providers/hello";
import { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <AccountProvider>
      <ChatDashboardProviders>{children}</ChatDashboardProviders>
    </AccountProvider>
  );
};

export default layout;
