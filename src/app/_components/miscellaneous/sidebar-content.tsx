"use client";

import { FC, useEffect, useState } from "react";
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
import { orgNavbarItems } from "@/config/marketing";
import Link from "next/link";
import { Icons } from "@/app/_components/miscellaneous/icons";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import SigninButton from "@/app/_components/miscellaneous/signin-button";
import { api } from "@/trpc/react";

import { authClient, useSession } from "@/lib/auth-client";
import { User } from "@/server/db/schema";
interface SidebarContentDataProps {}

const SidebarContentData: FC<SidebarContentDataProps> = ({}) => {
  const [user, setUser] = useState<User>();
  const session = useSession();

  useEffect(() => {
    async function getData() {
      const sessionRes = await authClient.getSession();
      const currentUser = sessionRes.data?.user as User;
      setUser(currentUser);
    }
    getData();
  }, []);

  console.log(user);
  if (!user) {
    return (
      <SidebarContent className="bg-background px-3 py-2 flex flex-col items-center justify-center gap-6">
        <SidebarMenu className="flex-1 flex items-center justify-center text-center font-semibold font-heading text-foreground text-subtitle-heading ">
          Please login to see your chat histories
        </SidebarMenu>
      </SidebarContent>
    );
  }

  const {
    data: chatHistory,
    isLoading,
    isError,
  } = api.chat.getListofChats.useQuery(undefined, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <SidebarContent className="bg-background px-3 py-2 flex flex-col items-center justify-center gap-6">
        {" "}
        │
        <SidebarMenu
          className="flex-1 flex items-center justify-center      
      text-center font-semibold font-heading text-foreground text                  
       -subtitle-heading"
        >
          <Icons.LoaderCircle className="animate-spin stroke-primary" />
        </SidebarMenu>
      </SidebarContent>
    );
  }

  if (isError) {
    return (
      <SidebarContent className="bg-background px-3 py-2 flex flex-col items-center justify-center gap-6">
        {" "}
        │
        <SidebarMenu
          className="flex-1 flex items-center justify-center      
      text-center font-semibold font-heading text-foreground text                  
       -subtitle-heading"
        >
          Error loading chat history
        </SidebarMenu>
      </SidebarContent>
    );
  }

  return (
    <SidebarContent className="bg-background px-3 py-2 flex flex-col items-start justify-start gap-6">
      <SidebarMenu className="flex-1">
        {chatHistory && chatHistory.length
          ? chatHistory.map((item, i) => {
              return (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton asChild className="">
                    <Link
                      href={`/chat/${item.id}`}
                      className="text-extra-paragraph-headin cursor-pointer menu-item-group font-paragraph text-foreground leading-normal tracking-wide"
                    >
                      <span className="max-w-[85%] block truncate ">
                        {item.id}
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
            })
          : null}
      </SidebarMenu>
    </SidebarContent>
  );
};

export default SidebarContentData;
