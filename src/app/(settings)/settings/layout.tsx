import ChatDashboardProviders from "@/app/_components/providers/chat-dashboard-providers";
import SettingsLayout from "@/app/_components/settings/settings-layout";
import React, { FC } from "react";

interface layoutProps {
  children: React.ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <ChatDashboardProviders>
      <SettingsLayout>{children}</SettingsLayout>
    </ChatDashboardProviders>
  );
};

export default layout;
