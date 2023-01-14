import {
  GET_KYC_STATUS_FAIL,
  GET_KYC_STATUS_SUCCESS,
  GET_PAID_MODULES_FAIL,
  GET_PAID_MODULES_SUCCESS,
  GET_FU_DATA_FAIL,
  GET_FU_DATA_SUCCESS,
} from "./types";
import UserService from "../../services/user.service";

export const getKyc = (user) => (dispatch) => {
  return UserService.getKycStatus(user).then(
    (response) => {
      if (response.data.status === 1) {
        dispatch({
          type: GET_KYC_STATUS_SUCCESS,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        console.log(response);
        const message = response.data.message;

        dispatch({
          type: GET_KYC_STATUS_FAIL,
        });
        console.log(message);
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_KYC_STATUS_FAIL,
      });
      console.log(message);
      return Promise.reject();
    }
  );
};

export const getPaidModules = () => (dispatch) => {
  return UserService.getPaidModules().then(
    (response) => {
      if (response.data.status === 1) {
        dispatch({
          type: GET_PAID_MODULES_SUCCESS,
          payload: response.data.nonExhaustedUserSubModuleSubscriptionBeans,
        });

        return Promise.resolve();
      } else {
        console.log(response);
        const message = response.data.message;

        dispatch({
          type: GET_PAID_MODULES_FAIL,
        });
        console.log(message);
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_PAID_MODULES_FAIL,
      });
      console.log(message);
      return Promise.reject();
    }
  );
};

export const getFundingUpdateInfo = () => (dispatch) => {
  return UserService.getFundingUpdateInfo().then(
    (response) => {
      if (response.data.status === 1) {
        dispatch({
          type: GET_FU_DATA_SUCCESS,
          payload: response.data,
        });

        return Promise.resolve();
      } else {
        console.log(response);
        const message = response.data.message;

        dispatch({
          type: GET_FU_DATA_FAIL,
        });
        console.log(message);
        return Promise.reject();
      }
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({
        type: GET_PAID_MODULES_FAIL,
      });
      console.log(message);
      return Promise.reject();
    }
  );
};
