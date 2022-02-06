import { authenticationConstants } from "../constants";
import { driverService } from "../../api/auth";

let access_token = null;
const initialState = async () => {
  if (access_token) {
    await driverService
      .authenticate(access_token)
      .then((driver) => {
        return { loggedIn: true, driver };
      })
      .catch((err) => {
        return { loggedIn: false, driver: null };
      });
  }

  return {};
};

export function authenticateDriver(state = initialState, action) {
  switch (action.type) {
    case authenticationConstants.DRIVER.LOGIN_REQUEST:
      return {
        loggingIn: true,
        driver: action.driver,
      };
    case authenticationConstants.DRIVER.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        driver: action.driver,
      };
    case authenticationConstants.DRIVER.LOGIN_FAILURE:
      return {};
    case authenticationConstants.DRIVER.LOGOUT:
      return {};
    default:
      return state;
  }
}
