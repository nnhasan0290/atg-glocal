import { GET_STATES_SUCCESS, GET_STATES_FAIL } from "./types";

import StatesService from "../../services/states.service";

export const getStates = () => (dispatch) => {
  return StatesService.getStates().then(
    (response) => {
      if (response.status === 200) {
        dispatch({
          type: GET_STATES_SUCCESS,
          payload: response.data,
        });
        return Promise.resolve();
      } else {
        const message = response.data.message;

        dispatch({
          type: GET_STATES_FAIL,
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
        type: GET_STATES_FAIL,
      });
      console.log(message);
      return Promise.reject();
    }
  );
};
