import { CLEAR_LOADER, SET_LOADER } from "../actions/types";

const initialState = { isLoading: false };

function Loader(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case SET_LOADER:
      return { isLoading: true };
    case CLEAR_LOADER:
      return { isLoading: false };
    default:
      return state;
  }
}

export default Loader;
