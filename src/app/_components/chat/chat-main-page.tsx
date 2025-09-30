import { FC, HtmlHTMLAttributes } from "react";
import ChatInput from "./chat-input";

interface ChatMainPageProps {
  id: string;
}

const ChatMainPage: FC<ChatMainPageProps> = ({ id }) => {
  return (
    <div>
      {id}

      <ChatInput mode="create" />
    </div>
  );
};

export default ChatMainPage;
