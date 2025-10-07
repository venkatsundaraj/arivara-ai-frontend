"use client";

import { rateLimitHandler } from "@/actions/chat-input";
import { Button } from "@/app/_components/ui/button";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const clickHandler = async function () {
    const data = await rateLimitHandler();
  };
  return (
    <Button className="cursor-pointer" onClick={clickHandler}>
      click
    </Button>
  );
};

export default page;
