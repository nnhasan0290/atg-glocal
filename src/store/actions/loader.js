import { SET_LOADER, CLEAR_LOADER } from "./types";

export const setLoader = () => ({
  type: SET_LOADER,
});
export const clearLoader = () => ({
  type: CLEAR_LOADER,
});
