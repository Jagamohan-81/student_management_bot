import config from "./chabot-components/config";
import MessageParser from "./chabot-components/MessageParser.jsx";
import ActionProvider from "./chabot-components/ActionProvider.jsx";
import Chatbot from "react-chatbot-kit";
import { addUser, changeBotStatus } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import WelcomeMsg from "./WelcomeMsg";
import ThankYouMsg from "./ThankYouMsg";
// import school from "../../public/large-school-building-scene.png";
const ChatbotComponent = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const botStatus = useSelector((state) => state.botStatus);
  return (
    <>
      <>
        <div className="grid  grid-flow-col gap-7">
          <div className="image-div my-9">
            <img src="/large-school-building-scene.png" alt="image" />
          </div>

          {botStatus && botStatus.active == null && <WelcomeMsg />}
          {botStatus && botStatus.active && (
            <>
              <div className="flex justify-end items-end mt-9 col-span-2">
                {console.log(userInfo, botStatus)}
                <Chatbot
                  config={config}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                />
              </div>
            </>
          )}
          {botStatus && botStatus.active == false && <ThankYouMsg />}
        </div>
      </>
    </>
  );
};

export default ChatbotComponent;
