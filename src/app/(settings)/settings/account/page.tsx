import { Button } from "@/app/_components/ui/button";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="py-4 w-full flex flex-col gap-6 md:gap-12 items-center justify-center bg-background font-heading">
      <div className="flex  items-center justify-between gap-3 w-full">
        <p className="text-tertiary-heading font-semibold leading-normal tracking-normal text-foreground">
          Upgrade to Pro
        </p>
        <p className="text-paragraph-heading font-semibold leading-normal tracking-normal text-foreground">
          Rs. 499 <span className="text-subtitle-heading">/mo</span>
        </p>
      </div>
      <ul className="grid gap-3 items-center justify-center grid-cols-1 md:grid-cols-3 w-full">
        <li className="text-extra-subtitle-heading text-center px-3 py-1.5 rounded-md  w-full bg-foreground/5 text-foreground/60  leading-normal tracking-normal font-semibold">
          Generouse Limit
        </li>
        <li className="text-extra-subtitle-heading text-center px-3 py-1.5 rounded-md  w-full bg-foreground/5 text-foreground/60  leading-normal tracking-normal font-semibold">
          Access to All Models
        </li>
        <li className="text-extra-subtitle-heading text-center px-3 py-1.5 rounded-md  w-full bg-foreground/5 text-foreground/60  leading-normal tracking-normal font-semibold">
          Priority Support
        </li>
      </ul>
      <Button className="text-white self-start cursor-pointer" size={"xl"}>
        Upgrade Now
      </Button>
      <p className="text-[16px] font-semibold leading-normal tracking-normal text-foreground/60">
        *Premium credits are used for models marked with a gem icon in the model
        selector. This includes: o3, Claude Sonnet, Gemini 2.5 Pro, GPT 5
        (Reasoning), Grok 3/4, and all image generation models. Additional
        Premium credits can be purchased separately for $8 per 100.
      </p>
      <div className="flex  mt-24 flex-col items-start justify-between gap-3 md:gap-6 w-full">
        <p className="text-tertiary-heading font-semibold leading-normal tracking-normal text-foreground">
          Danger zone
        </p>
        <Button
          className="text-white self-start cursor-pointer"
          size={"xl"}
          variant={"destructive"}
        >
          Delete Account
        </Button>
      </div>
    </section>
  );
};

export default page;
