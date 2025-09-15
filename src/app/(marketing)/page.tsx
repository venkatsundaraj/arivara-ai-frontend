import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const result = await api.post.hello({ text: "venkat" });
  console.log(result);
  return (
    <HydrateClient>
      <h1 className="hover:text-3xl text-green-600 cursor-pointer">
        Hello world
      </h1>
    </HydrateClient>
  );
}
