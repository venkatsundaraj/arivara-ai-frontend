import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";

import { FC } from "react";
import { orgNavbarItems } from "@/config/marketing";
import Link from "next/link";
import { Icons } from "@/app/_components/miscellaneous/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

interface AppSidebarProps {}

export const AppSidebar: FC<AppSidebarProps> = function ({}) {
  return (
    <Sidebar className="bg-background py-2">
      <SidebarHeader className="bg-background">
        <h4 className="text-primary font-bold text-paragraph-heading  text-center leading-tight tracking-normal font-paragraph  max-w-2xl">
          arivara.ai
        </h4>
      </SidebarHeader>
      <SidebarContent className="bg-background px-3 py-8 flex flex-col items-start justify-start gap-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href={``}
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "hover:bg-primary/40"
                )}
              >
                New Chat
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="hidden">
          <h5 className="text-foreground/50  mb-4 uppercase font-bold text-subtitle-heading text-left leading-tight tracking-normal font-paragraph  max-w-2xl">
            Study Module
          </h5>
          {orgNavbarItems.map((item, i) => {
            const Icon = Icons[item.icon];
            return (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <Icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
        <SidebarMenu className="hidden">
          <h5 className="text-foreground/50 mb-4 uppercase font-bold text-subtitle-heading text-left leading-tight tracking-normal font-paragraph  max-w-2xl">
            My Account
          </h5>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={``}>
                <Icons.User />
                <span>Me</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
