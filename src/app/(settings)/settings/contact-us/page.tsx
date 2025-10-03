import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="py-4 w-full flex flex-col gap-6 md:gap-12 items-start justify-center bg-background font-heading">
      <div className="flex  items-center justify-between gap-3 w-full">
        <p className="text-tertiary-heading font-semibold leading-normal tracking-normal text-foreground">
          We are here to help!
        </p>
      </div>
      <div className="w-full flex items-center gap-3 bg-primary py-4 px-6 rounded-sm justify-center flex-col">
        <p className="text-subtitle-heading font-normal leading-normal tracking-normal text-white">
          Email:
          <Link href={"mailto:varamsortho@gmail.com"}>
            {" "}
            varamsortho@gmail.com
          </Link>
        </p>
        <p className="text-subtitle-heading font-normal leading-normal tracking-normal text-white">
          Phone
          <Link href={"tel:+919600089233"}> +919600089233</Link>
        </p>
      </div>
    </section>
  );
};

export default page;
