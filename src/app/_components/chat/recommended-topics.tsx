import { recommendedList } from "@/config/marketing";
import { FC } from "react";
import { Button } from "@/app/_components/ui/button";
import { Icons } from "../miscellaneous/icons";

interface RecommendedTopicsProps {}

const RecommendedTopics: FC<RecommendedTopicsProps> = ({}) => {
  return (
    <ul className="flex items-center justify-center gap-2.5 flex-wrap md:flex-nowrap">
      {recommendedList.map((item, i) => {
        const Icon = Icons[item.icon];
        return (
          <li key={i} className="flex items-center justify-center ">
            <Button
              variant={"outline"}
              className="rounded-full cursor-pointer !bg-primary/90  gap-3"
            >
              <Icon className="stroke-white" />
              <span className="font-normal text-white block">{item.title}</span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};

export default RecommendedTopics;
