import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/miscellaneous/app-sidebar";
import DashboardProvider from "@/app/_components/providers/dashboard-providers";
import { ModeToggle } from "@/app/_components/miscellaneous/toggle-theme";
import { EditorProvider } from "@/hooks/use-editors";
import { ChatProvider } from "@/hooks/use-chat";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import AccountProvider from "../_components/providers/account-provider";

interface layoutProps {
  children: React.ReactNode;
}

const initialConfig = {
  namespace: "chat-input",
  theme: {
    text: {
      bold: "font-bold",
      italic: "italic",
      underline: "underline",
    },
  },
  onError: (err: Error) => {
    console.log(err);
  },
  nodes: [],
};

const layout = async ({ children }: layoutProps) => {
  return (
    <AccountProvider>
      <DashboardProvider>
        <EditorProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-background flex flex-col items-center justify-start">
              <nav className="w-full ">
                <div className="flex items-center justify-between py-4 px-8">
                  <SidebarTrigger />
                  <ModeToggle />
                </div>
              </nav>
              {children}
            </main>
          </SidebarProvider>
        </EditorProvider>
      </DashboardProvider>
    </AccountProvider>
  );
};

export default layout;
