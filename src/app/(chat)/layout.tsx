import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/miscellaneous/app-sidebar";
import DashboardProvider from "@/app/_components/providers/dashboard-providers";
import { ModeToggle } from "@/app/_components/miscellaneous/toggle-theme";
import { EditorProvider } from "@/hooks/use-editors";
import { ChatProvider } from "@/hooks/use-chat";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import AccountProvider from "../_components/providers/account-provider";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import { Icons } from "../_components/miscellaneous/icons";

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
  const session = await getCurrentUser();
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
                  <div className="flex items-center justify-center gap-4">
                    {!session?.user ? null : (
                      <Link
                        href={"/settings/account"}
                        className="hover:bg-background/80"
                      >
                        <Icons.Settings2 className="stroke-foreground w-4 h-8 " />
                      </Link>
                    )}
                    <ModeToggle />
                  </div>
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
