import { FC } from "react";
import SettingsHeader from "./settings-header";

import { auth } from "@/lib/auth";
import { Slider } from "../ui/slider";
import Link from "next/link";
import SettingsNavbar from "./settings-navbar";
import { Icons } from "../miscellaneous/icons";
import { getCurrentUser } from "@/lib/session";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

const SettingsLayout = async ({ children }: SettingsLayoutProps) => {
  const session = await getCurrentUser();
  // console.log(session);

  return (
    <main className="flex items-center justify-center flex-col w-screen bg-background">
      <SettingsHeader />
      <section className="py-16 flex items-center justify-center w-screen font-paragraph">
        <div className="container  items-start  grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="flex flex-col items-center justify-start gap-3">
            <div className="flex flex-col items-center justify-center gap-4">
              {session?.user.image ? (
                <img
                  src={session?.user.image}
                  className="w-44 h-44 rounded-full"
                />
              ) : null}
              {session?.user.name ? (
                <span className="text-subtitle-heading text-foreground/60 font-heading font-normal">
                  {session.user.name}
                </span>
              ) : null}
              <span className="text-[15px] px-3 py-1.5 rounded-2xl bg-foreground/10 leading-normal tracking-normal text-foreground/60">
                Free Plan
              </span>
            </div>
            <div className="flex w-full  flex-col items-center justify-center gap-3 my-8 py-4 px-4 rounded-md bg-foreground/10">
              <div className="flex mb-4  items-center justify-between gap-3 w-full">
                <p className="text-[16px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  Message Usage
                </p>
                <p className="text-[12px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  Resets tomorrow at 4:59 AM
                </p>
              </div>
              <div className="flex  items-center justify-between gap-3 w-full">
                <p className="text-[16px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  Standard
                </p>
                <p className="text-[12px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  20
                </p>
              </div>
              <Slider disabled />
              <p className="text-[12px] font-semibold w-full text-left rounded-2xl  leading-normal tracking-normal text-foreground/60">
                20 Messages Remaining
              </p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-4 my-3 py-4 px-4 rounded-md bg-foreground/10">
              <p className="text-subtitle-heading font-semibold w-full text-left rounded-2xl  leading-normal tracking-normal text-foreground/60">
                Key board shortcuts
              </p>
              <div className="flex   items-center justify-between gap-3 w-full">
                <p className="text-[15px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  Search
                </p>
                <p className="text-[12px] flex gap-2 items-center justify-center font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  <Icons.Command className="stroke-foreground p-2 w-8 h-8 bg-foreground/10 rounded-sm" />
                  <span className="p-2 bg-foreground/10 w-8 h-8 text-center rounded-sm">
                    K
                  </span>
                </p>
              </div>
              <div className="flex  items-center justify-between gap-3 w-full">
                <p className="text-[15px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  New Chat
                </p>
                <p className="text-[12px] flex gap-2 items-center justify-center font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  <Icons.Command className="stroke-foreground p-2 w-8 h-8 bg-foreground/10 rounded-sm" />
                  <span className="p-2 bg-foreground/10 w-12 h-8 text-center rounded-sm">
                    Shift
                  </span>
                  <span className="p-2 bg-foreground/10 w-8 h-8 text-center rounded-sm">
                    O
                  </span>
                </p>
              </div>
              <div className="flex  items-center justify-between gap-3 w-full">
                <p className="text-[15px] font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  Toggle Sidebar
                </p>
                <p className="text-[12px] flex gap-2 items-center justify-center font-semibold rounded-2xl  leading-normal tracking-normal text-foreground/60">
                  <Icons.Command className="stroke-foreground p-2 w-8 h-8 bg-foreground/10 rounded-sm" />

                  <span className="p-2 bg-foreground/10 w-8 h-8 text-center rounded-sm">
                    B
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="flex md:col-start-2 md:col-end-5  flex-col items-start justify-center gap-4">
            <SettingsNavbar />
            {children}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SettingsLayout;
