import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from "./types";
import { alert } from "../../helpers/alerts";
import { clearLoader } from "../../store/actions/loader";

import AuthService from "../../services/auth.service";

export const register = (username, email, password, number) => (dispatch) => {
  return AuthService.register(username, email, password, number).then(
    (response) => {
      if (response.data.status === 1) {
        dispatch({
          type: REGISTER_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Registraion Successful",
        });
      } else {
        const message = response.data.message;

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      }
      return Promise.resolve(response);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (email, password, number) => (dispatch) => {
  return AuthService.login(email, password, number).then(
    (data) => {
      if (data.status === 1) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        console.log("Login Success");
      } else {
        const message = data.message;

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        console.log("Login fail");
      }
      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log("fail");

      return Promise.reject();
    }
  );
};
export const loginWithGoogle = (authToken) => (dispatch) => {
  return AuthService.loginWithGoogle(authToken).then(
    (data) => {
      dispatch(clearLoader());
      if (data.status === 1) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
      } else {
        const message = data.message;

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        console.log("Login fail");
      }
      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      alert("error", message);
      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });
      console.log("fail");

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};

export const forgotPassword = (email) => (dispatch) => {
  return AuthService.forgotPassword(email).then(
    (response) => {
      if (response.data.status === 1) {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Link Sent",
        });
      } else {
        const message = response.data.message;

        dispatch({
          type: FORGOT_PASSWORD_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      }
      return Promise.resolve(response);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const resetPassword = (newPassword, requestId) => (dispatch) => {
  return AuthService.resetPassword(newPassword, requestId).then(
    (response) => {
      if (response.data.status === 1) {
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: "Password Change Successfull",
        });
      } else {
        const message = response.data.message;

        dispatch({
          type: RESET_PASSWORD_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
      }
      return Promise.resolve(response);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
