import { combineReducers } from "redux";

const initialState = {
  userInfo: {},
};
const botStatus = {
  active: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

const botStatusReducer = (state = botStatus, action) => {
  switch (action.type) {
    case "CHANGE_BOT_STATUS":
      return {
        ...state,
        active: !state.active,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  botStatus: botStatusReducer,
});

export default rootReducer;
