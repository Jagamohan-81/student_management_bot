import { createChatBotMessage } from "react-chatbot-kit";
import { GotIt, TakeName, TakeAge } from "./Responses";
const botName = "ExcitementBot";
const config = {
  initialMessages: [
    createChatBotMessage(`Hello, Welcome to student info system!`, {
      widget: "GotIt",
      delay: 300,
    }),
  ],
  botName: "Sikhysa - Bot",
  customComponents: {
    // Replaces the default header
    // header: () => <div>Your're chatting with a Bot !</div>,//
    // Replaces the default bot avatar
    //  botAvatar: (props) => <MyAvatar {...props} />,
    // Replaces the default bot chat message container
    //  botChatMessage: (props) => <MyCustomChatMessage {...props} />,
    // Replaces the default user icon
    //  userAvatar: (props) => <MyCustomAvatar {...props} />,
    // Replaces the default user chat message
    //  userChatMessage: (props) => <MyCustomUserChatMessage {...props} />
  },
  widgets: [
    {
      widgetName: "GotIt",
      widgetFunc: (props) => <GotIt {...props} />,
    },

    {
      widgetName: "TakeName",
      widgetFunc: (props) => <TakeName {...props} />,
    },
    {
      widgetName: "TakeAge",
      widgetFunc: (props) => <TakeAge {...props} />,
    },
  ],
};

export default config;
