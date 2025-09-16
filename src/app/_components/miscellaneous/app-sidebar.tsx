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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { FC } from "react";
import { orgNavbarItems } from "@/config/marketing";
import Link from "next/link";
import { Icons } from "@/app/_components/miscellaneous/icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";

interface AppSidebarProps {}

export const AppSidebar: FC<AppSidebarProps> = function ({}) {
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
          href={``}
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
      <SidebarContent className="bg-background px-3 py-2 flex flex-col items-start justify-start gap-6">
        <SidebarMenu className="flex-1">
          {orgNavbarItems.map((item, i) => {
            return (
              <SidebarMenuItem key={i}>
                <SidebarMenuButton asChild className="">
                  <Link
                    href={item.url}
                    className="text-extra-paragraph-headin cursor-pointer menu-item-group font-paragraph text-foreground leading-normal tracking-wide"
                  >
                    <span className="max-w-[85%] block truncate ">
                      {item.title}
                    </span>
                    <DropdownMenu key={i}>
                      <DropdownMenuTrigger
                        className={cn(
                          "opacity-0 menu-item-group-hover:opacity-100 menu-item-group-active:opacity-100"
                        )}
                      >
                        <Icons.Ellipsis className="cursor-pointer stroke-1" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="border-[0.5px] cursor-pointer">
                        <DropdownMenuItem className="cursor-pointer">
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Pin
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Link
          href={``}
          className={cn(buttonVariants({ variant: "ghost" }), "gap-4")}
        >
          <Icons.LogIn className="w-20" />
          <span className="text-extra-subtitle-heading text-foreground leading-normal tracking-normal font-paragraph">
            Login
          </span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
};
