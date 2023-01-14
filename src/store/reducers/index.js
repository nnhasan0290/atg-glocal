import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import loader from "./loader";
import states from "./states";
import { kycStatus, paidModules, fuData } from "./user";

export default combineReducers({
  auth,
  message,
  loader,
  states,
  kycStatus,
  paidModules,
  fuData,
});
