import ChatDashboardProviders from "@/app/_components/providers/chat-dashboard-providers";
import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return <ChatDashboardProviders>{children}</ChatDashboardProviders>;
};

export default layout;
