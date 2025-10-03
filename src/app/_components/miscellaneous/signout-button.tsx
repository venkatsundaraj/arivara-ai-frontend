"use client";

import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/app/_components/miscellaneous/icons";

interface SignoutButtonProps {}

const SignoutButton: FC<SignoutButtonProps> = ({}) => {
  return (
    <Button
      onClick={() => signOut()}
      className={cn(
        buttonVariants({ variant: "link" }),
        "gap-4 no-underline p-0 bg-transparent cursor-pointer h-[initial] text-primary hover:bg-inherit hover:no-underline"
      )}
    >
      <span className="text-extra-subtitle-heading text-foreground leading-normal tracking-normal font-paragraph">
        Signout
      </span>
    </Button>
  );
};

export default SignoutButton;
