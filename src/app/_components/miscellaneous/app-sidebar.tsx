import { Icons } from "@/app/_components/miscellaneous/icons";
import SigninButton from "@/app/_components/miscellaneous/signin-button";
import { buttonVariants } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/app/_components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SidebarContentData from "@/app/_components/miscellaneous/sidebar-content";

interface AppSidebarProps {}

export const AppSidebar = async function ({}: AppSidebarProps) {
  return (
    <Sidebar className="bg-background py-2">
      <SidebarHeader className="bg-background gap-2">
        <Link
          href={"/"}
          className="text-foreground font-bold text-paragraph-heading  text-center leading-tight tracking-normal font-heading  max-w-2xl mb-4"
        >
          arivara.ai
        </Link>
        <Link
          href={`/`}
          className={cn(
            buttonVariants({ variant: "default" }),
            "hover:bg-primary/90 text-white hover:text-white"
          )}
        >
          New Chat
        </Link>
        <SidebarMenuButton className="flex items-center justify-center w-full mt-3">
          <Icons.Search />
          <Input
            type="text"
            placeholder="Search your history"
            className="border-none outline-none focus-within:border-none border-b-0 focus-within:outline-none focus-visible:ring-0"
          />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContentData />
      <SidebarFooter>
        <SigninButton />
      </SidebarFooter>
    </Sidebar>
  );
};
