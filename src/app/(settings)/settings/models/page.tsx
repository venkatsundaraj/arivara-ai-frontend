import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <section className="min-h-screen py-24 w-full flex flex-col gap-6 items-center justify-center bg-background"></section>
  );
};

export default page;
