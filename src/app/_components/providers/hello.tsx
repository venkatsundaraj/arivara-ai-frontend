"use client";
import { FC } from "react";

interface HelloProps {
  children: React.ReactNode;
}

const Hello: FC<HelloProps> = ({ children }) => {
  return <>{children}</>;
};

export default Hello;
