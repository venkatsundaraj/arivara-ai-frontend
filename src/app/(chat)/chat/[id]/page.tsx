import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page = async ({ params }: pageProps) => {
  const param = await params;
  console.log(param.id);
  return <div>{param.id}</div>;
};

export default page;
