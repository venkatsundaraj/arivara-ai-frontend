import Link from "next/link";
import { FC } from "react";
import { Icons } from "../miscellaneous/icons";
import { ModeToggle } from "../miscellaneous/toggle-theme";
import SignoutButton from "../miscellaneous/signout-button";

interface SettingsHeaderProps {}

const SettingsHeader: FC<SettingsHeaderProps> = ({}) => {
  return (
    <header className="w-screen flex items-center justify-center py-6 bg-background">
      <div className="container flex items-center justify-between">
        <Link href={"/"} className="flex items-center justify-center gap-1.5">
          <Icons.ChevronLeft className="stroke-foreground" />
          Back to chat
        </Link>
        <div className="flex items-center justify-center gap-4">
          <ModeToggle />
          <SignoutButton />
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
