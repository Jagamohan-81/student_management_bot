export const addUser = (userData) => {
  return {
    type: "ADD_USER",
    payload: userData,
  };
};

export const changeBotStatus = (userData) => {
  return {
    type: "CHANGE_BOT_STATUS",
  };
};
