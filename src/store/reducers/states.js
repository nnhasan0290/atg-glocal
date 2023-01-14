/* eslint-disable import/no-anonymous-default-export */
import { GET_STATES_SUCCESS, GET_STATES_FAIL } from "../actions/types";

const initialState = { states: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_STATES_SUCCESS:
      return {
        ...state,
        states: payload,
      };
    case GET_STATES_FAIL:
      return {
        ...state,
        states: [],
      };

    default:
      return state;
  }
}
