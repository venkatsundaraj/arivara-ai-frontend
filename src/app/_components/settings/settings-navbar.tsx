"use client";
import { settingsLink } from "@/config/marketing";
import { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSelectedLayoutSegment } from "next/navigation";

interface SettingsNavbarProps {}

const SettingsNavbar: FC<SettingsNavbarProps> = ({}) => {
  const segment = useSelectedLayoutSegment();
  console.log(segment);
  return (
    <nav className="flex w-full items-center justify-center flex-row overflow-scroll flex-nowrap rounded-sm bg-foreground/10 py-2 px-6">
      <ul className="flex w-full items-center justify-between overflow-scroll flex-nowrap scrollbar-hide">
        {settingsLink.map((item, i) => (
          <li
            key={i}
            className="text-foreground/80 font-paragraph h-10 flex items-center justify-center"
          >
            <Link
              href={`/settings${item.link}`}
              className={cn(
                "px-3 py-1.5 rounded-md font-semibold text-nowrap",
                item.link.startsWith(`/${segment}`)
                  ? "bg-primary text-white rounded-md"
                  : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SettingsNavbar;
