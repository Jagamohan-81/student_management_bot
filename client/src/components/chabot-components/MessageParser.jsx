// in MessageParser.js
import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    console.log("message--", message);
    const lowerCaseMessage = message.toLowerCase();
    if (
      lowerCaseMessage.includes("Welcome") ||
      lowerCaseMessage.includes("hi")
    ) {
      actions.handleHello();
    }
    if (lowerCaseMessage.includes("got it")) {
      actions.handleGotItText();
    }
    if (!message) {
      actions.handleEmptyMsg();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
