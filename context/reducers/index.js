import { authenticateDriver } from "./driver-authentication";
import { combineReducers } from "redux";

export default combineReducers({
  authenticateDriver: authenticateDriver,
});
