"use client";

import type { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";

type pageProps = {};

const page: FC<pageProps> = ({}) => {
  return (
    <div className="p-8 relative h-[200vh] ">
      <h1 className="text-2xl font-bold mb-4">Dropdown Test</h1>
      <p className="mb-4">Click anywhere outside the dropdown to close it.</p>
      <div className="group bg-violet-600">
        {Array.from({ length: 5 }).map((item, i) => (
          <div key={i} className="w-20 h-20 bg-yellow-500 group">
            <span className="group-hover:text-4xl text-2xl">{i}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
