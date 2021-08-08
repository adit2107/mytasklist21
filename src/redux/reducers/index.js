import { combineReducers } from "redux";
import users from "./userReducer";
import todos from "./todoReducer";

export default combineReducers({
  users,
  todos,
});
