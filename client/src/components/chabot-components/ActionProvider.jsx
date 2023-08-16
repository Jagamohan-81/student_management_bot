// in ActionProvider.jsx
import React from "react";
import { createClientMessage } from "react-chatbot-kit";
const ActionProvider = ({
  createChatBotMessage,
  state,
  setState,
  children,
}) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage(
      "Hello. Nice to meet you.Please go ahead with your inputs !",
      {
        widget: "learningOptions",
      }
    );

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  // console.log("createClientMessage---", createClientMessage);
  const handleGotItButton = () => {
    const clientMessage = createClientMessage("Got It !");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, clientMessage],
    }));
    const message = createChatBotMessage("Enter your Name :", {
      widget: "TakeName",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  const handleGotItText = () => {
    const message = createChatBotMessage("Enter your Name :", {
      widget: "TakeName",
    });

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  const handleName = () => {
    const message = createChatBotMessage("Enter your Age :", {
      widget: "TakeAge",
    });
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  const handleAge = () => {
    const message = createChatBotMessage(
      "Thank you. In 5 seconds, bot will exit"
    );
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };
  const handleEmptyMsg = () => {
    const message = createChatBotMessage("Please Enter Valid Response !");
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleEmptyMsg,
            handleGotItButton,
            handleGotItText,
            handleName,
            handleAge,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
