import React from "react";
import { addUser, changeBotStatus } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
const ThankYouMsg = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const botStatus = useSelector((state) => state.botStatus);
  return (
    <div className="flex justify-center items-center mt-9">
      {userInfo && userInfo.name && userInfo.age && (
        <p>
          Your name <strong>{userInfo.name}</strong> aged{" "}
          <strong>{userInfo.age}</strong> has been added to student system. You
          may now exit.
        </p>
      )}
    </div>
  );
};

export default ThankYouMsg;
