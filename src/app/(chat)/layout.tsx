import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/miscellaneous/app-sidebar";
import DashboardProvider from "@/app/_components/providers/dashboard-providers";
import { ModeToggle } from "@/app/_components/miscellaneous/toggle-theme";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full bg-background">
          <nav className="w-full ">
            <div className="flex items-center justify-between py-4 px-8">
              <SidebarTrigger />
              <ModeToggle />
            </div>
          </nav>
          {children}
        </main>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default layout;
