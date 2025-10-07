import { FC } from "react";
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
import Link from "next/link";
import { orgNavbarItems } from "@/config/marketing";
import { Icons } from "@/app/_components/miscellaneous/icons";
import { cn } from "@/lib/utils";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="w-full flex flex-col gap-6 items-start justify-start bg-background py-6 ">
      <div className="flex  items-center justify-between gap-3 w-full">
        <p className="text-tertiary-heading font-semibold leading-normal tracking-normal text-foreground">
          Manage History
        </p>
      </div>
      <div className="flex flex-col items-start w-full justify-start gap-4 h-[68vh] scrollbar-hide overflow-y-scroll">
        {orgNavbarItems.map((item, i) => {
          return (
            <Link
              key={i}
              href={item.url}
              className="text-extra-paragraph-heading  cursor-pointer menu-item-group flex items-center w-full  px-3 justify-between font-paragraph text-foreground leading-normal tracking-wide"
            >
              <span className="max-w-[85%] text-[16px] block truncate ">
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
          );
        })}
      </div>
    </section>
  );
};

export default page;
