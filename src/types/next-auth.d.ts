import { User, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserId = string;
declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    email: string;
    image: string;
    name: string;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
    };
  }
}
