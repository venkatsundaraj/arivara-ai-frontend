"use client";
import { FC, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/app/_components/miscellaneous/icons";
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
import Image from "next/image";
import Link from "next/link";
import SignoutButton from "@/app/_components/miscellaneous/signout-button";

interface SigninButtonProps {}

const SigninButton: FC<SigninButtonProps> = ({}) => {
  const { data: session, status } = useSession();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    if (session?.user) {
    }
  }, [isMounted, session]);

  if (!isMounted || status === "loading")
    return (
      <Button className={cn(buttonVariants({ variant: "outline" }), "gap-4")}>
        <Icons.LoaderCircle className="w-20 animate-spin stroke-foreground" />
      </Button>
    );
  return session ? (
    <div className="w-full flex flex-row items-center justify-between">
      <div className="flex items-center justify-start gap-2.5">
        {session.user && session.user.image ? (
          <img
            src={session.user.image}
            alt={"user profile"}
            className="w-8 h-8 rounded-full"
          />
        ) : null}
        <span className="text-subtitle-heading text-foreground font-heading font-normal">
          {session.user.name}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn("menu-item-group-active:opacity-100")}
        >
          <Icons.Ellipsis className="cursor-pointer stroke-1 stroke-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-[0.5px] cursor-pointer">
          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link
              className="font-normal text-subtitle-heading text-foreground"
              href={"/settings/subscription"}
            >
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <SignoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <Button
      onClick={() => signIn("google")}
      className={cn(buttonVariants({ variant: "outline" }), "gap-4")}
    >
      <Icons.LogIn className="w-20" />
      <span className="text-extra-subtitle-heading text-foreground leading-normal tracking-normal font-paragraph">
        Signin
      </span>
    </Button>
  );
};

export default SigninButton;
