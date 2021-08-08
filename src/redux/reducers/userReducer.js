const _ = require("lodash");

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
  user: {},
  loggedIn: localStorage.getItem("token") ? true : false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTERED":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true
      };
    case "LOGGED_IN":
      return {
        ...state,
        token: localStorage.setItem("token", action.payload.data.token),
        loggedIn: action.payload,
        isAuthenticated: !_.isEmpty(action.payload),
        user: action.payload,
      };
    case "LOGGED_OUT":
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        loggedIn: action.payload,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
