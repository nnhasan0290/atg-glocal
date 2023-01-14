import {
  GET_KYC_STATUS_FAIL,
  GET_KYC_STATUS_SUCCESS,
  GET_PAID_MODULES_FAIL,
  GET_PAID_MODULES_SUCCESS,
  GET_FU_DATA_FAIL,
  GET_FU_DATA_SUCCESS,
} from "../actions/types";

const initialStateKyc = { kycStatus: "" };
const initialStatePaidModules = { paidModulesBean: [] };
const initialStateFuData = {};

export function kycStatus(state = initialStateKyc, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_KYC_STATUS_SUCCESS:
      return { kycStatus: payload.kycStatus };
    case GET_KYC_STATUS_FAIL:
      return { ...state };
    default:
      return state;
  }
}

export function paidModules(state = initialStatePaidModules, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PAID_MODULES_SUCCESS:
      return { ...state, paidModulesBean: payload };
    case GET_PAID_MODULES_FAIL:
      return { ...state };
    default:
      return state;
  }
}

export function fuData(state = initialStateFuData, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FU_DATA_SUCCESS:
      return { ...state, fuDataBean: payload };
    case GET_FU_DATA_FAIL:
      return { ...state };
    default:
      return state;
  }
}
