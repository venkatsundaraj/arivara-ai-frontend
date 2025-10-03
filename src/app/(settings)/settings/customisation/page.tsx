import { Input } from "@/app/_components/ui/input";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="w-full flex flex-col gap-6 items-start justify-start bg-background py-6 ">
      <div className="flex  flex-col items-start justify-between gap-3 w-full">
        <p className="text-tertiary-heading font-semibold leading-normal tracking-normal text-foreground">
          Customize your app
        </p>
        <div className="flex flex-col items-start justify-between gap-3 w-full mt-8">
          <label className="text-[16px] font-heading leading-normal tracking-normal text-foreground/60 font-semibold">
            What should Arivara Ai call you?
          </label>
          <Input type="text" className="w-full h-12" placeholder="Your Name" />
        </div>
        <div className="flex flex-col items-start justify-between gap-3 w-full mt-8">
          <label className="text-[16px] font-heading leading-normal tracking-normal text-foreground/60 font-semibold">
            What do you do?
          </label>
          <Input
            type="text"
            className="w-full h-12"
            placeholder="Engineer, Student, etc."
          />
        </div>
      </div>
    </section>
  );
};

export default page;
