"use client";
import { FC } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, buttonVariants } from "@/app/_components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "@/app/_components/miscellaneous/icons";

interface SigninButtonProps {}

const SigninButton: FC<SigninButtonProps> = ({}) => {
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "loading")
    return (
      <Button className={cn(buttonVariants({ variant: "outline" }), "gap-4")}>
        <Icons.LoaderCircle className="w-20 animate-spin stroke-foreground" />
      </Button>
    );
  return session ? (
    <Button
      onClick={() => signOut()}
      className={cn(buttonVariants({ variant: "outline" }), "gap-4")}
    >
      <Icons.LogIn className="w-20" />
      <span className="text-extra-subtitle-heading text-foreground leading-normal tracking-normal font-paragraph">
        Signout
      </span>
    </Button>
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
