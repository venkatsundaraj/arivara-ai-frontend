import { SidebarProvider, SidebarTrigger } from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/miscellaneous/app-sidebar";
import DashboardProvider from "@/app/_components/providers/dashboard-provider";

interface layoutProps {
  children: React.ReactNode;
}

const layout = async ({ children }: layoutProps) => {
  return (
    <DashboardProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <nav className="w-full ">
            <div className="container flex items-center justify-between py-4">
              <SidebarTrigger />
            </div>
          </nav>
          {children}
        </main>
      </SidebarProvider>
    </DashboardProvider>
  );
};

export default layout;
