import { authenticationConstants } from "../constants";
import { driverService } from "../../api/auth";

export const driverActions = { login, logout };

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    driverService
      .login(email, password)
      .then((driver) => {
        dispatch(success(driver));
        // history.push('/');
      })
      .catch((err) => {
        dispatch(failure(err));
      });
  };

  function request(driver) {
    return { type: authenticationConstants.DRIVER.LOGIN_REQUEST, driver };
  }
  function success(driver) {
    return { type: authenticationConstants.DRIVER.LOGIN_SUCCESS, driver };
  }
  function failure(error) {
    return { type: authenticationConstants.DRIVER.LOGIN_FAILURE, error };
  }
}

function logout() {
  driverService.logout();
  return { type: authenticationConstants.DRIVER.LOGOUT };
}
