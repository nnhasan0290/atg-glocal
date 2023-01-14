import axios from "axios";
import {
  API_GET_JOB_DETAILS,
  API_URL_KYC_STATUS,
  API_FETCH_JOBS_USER,
  API_URL_EVENT,
  API_URL_FU,
  API_URL_RFP,
  API_URL_JOB,
  API_URL_APPLY_KYC,
  API_URL_REVIEW_JOB_APPLICATION,
  API_URL_UPDATE_JOB,
  GET_PAID_MODULES,
  SUBMIT_CSR_TEST,
  API_CREATE_ACADEMICS,
  API_FETCH_FUDATA,
  API_UPDATE_CONTACT_NUMBER,
  API_USER_DETAILS,
  API_FETCH_FUNDING_UPDATE_DETAILS,
  GET_CSR_DATA,
  APPLY_FUNDING_UPDATE,
  INITIATE_PAYMENT,
  MAKE_PAYMENT,
  FETCH_FUNDING_UPDATES_BY_ID,
  API_FETCH_EVENT_DETAILS,
  REGISTER_WORKSHOP_EVENT,
  API_FETCH_EVENT_REGISTRATION,
  API_FETCH_EVENTS_BY_CATEGORY,
  API_FETCH_ALL_EVENTS,
  PAYMENT_VALIDATION,
  API_FETCH_HOME,
  API_ALL_STATES,
} from "../constants/urls";

import AuthHeader from "./auth-header";
class UserService {
  getKycStatus(user) {
    const headers = {
      user_id: user.userId,
    };

    return axios.post(API_URL_KYC_STATUS, {}, { headers: headers });
  }
  createAwardEvent(data) {
    return axios.post(API_URL_EVENT + "createAwardAndCompetitionsEvent", data, {
      headers: AuthHeader(),
    });
  }
  createExhibitionEvent(data) {
    return axios.post(API_URL_EVENT + "createExhibitionEvent", data, {
      headers: AuthHeader(),
    });
  }

  createWorkshopEvent(data) {
    return axios.post(API_URL_EVENT + "createWorkshopAndTrainingEvent", data, {
      headers: AuthHeader(),
    });
  }

  getEventDetails(id, categoryId) {
    return axios.post(
      API_FETCH_EVENT_DETAILS,
      {
        eventId: id,
        eventCategoryId: categoryId,
      },
      { headers: AuthHeader() }
    );
  }
  registerForWorkshop(data) {
    return axios.post(REGISTER_WORKSHOP_EVENT, data, {
      headers: AuthHeader(),
    });
  }
  paymentValidation(razorpayOrderId) {
    return axios.post(
      PAYMENT_VALIDATION,

      { razorpayOrderId: razorpayOrderId },
      { headers: AuthHeader() }
    );
  }

  createFundingUpdate(data) {
    return axios.post(API_URL_FU, data, {
      headers: AuthHeader(),
    });
  }
  createRFP(data) {
    return axios.post(API_URL_RFP, data, {
      headers: AuthHeader(),
    });
  }
  createJob(data) {
    return axios.post(API_URL_JOB, data, {
      headers: AuthHeader(),
    });
  }
  updateKYC(data) {
    return axios.post(API_URL_APPLY_KYC, data, {
      headers: AuthHeader(),
    });
  }
  fetchJobs(type) {
    return axios.post(
      API_FETCH_JOBS_USER,
      {
        dataType: 2,
      },
      { headers: AuthHeader() }
    );
  }
  updateJob(data) {
    return axios.post(API_URL_UPDATE_JOB, data, {
      headers: AuthHeader(),
    });
  }

  reviewJobApplication(id, type) {
    return axios.post(
      API_URL_REVIEW_JOB_APPLICATION,
      {
        jobApplicationId: id,
        jobApplicationStatus: type,
      },
      { headers: AuthHeader() }
    );
  }
  getJobDetails(id) {
    return axios.post(
      API_GET_JOB_DETAILS,
      {
        id: id,
      },
      { headers: AuthHeader() }
    );
  }
  downloadPdf(url) {
    return axios.get(url, {
      responseType: "blob",
    });
  }

  getPaidModules() {
    return axios.post(GET_PAID_MODULES, {}, { headers: AuthHeader() });
  }

  submitCsrTest(data) {
    return axios.post(SUBMIT_CSR_TEST, data, {
      headers: AuthHeader(),
    });
  }
  createAcademics(data) {
    return axios.post(API_CREATE_ACADEMICS, data, {
      headers: AuthHeader(),
    });
  }
  getFundingUpdateInfo() {
    return axios.post(
      API_FETCH_FUDATA,
      {},
      {
        headers: AuthHeader(),
      }
    );
  }
  updateMobileNumber(value) {
    return axios.post(
      API_UPDATE_CONTACT_NUMBER,
      { contactNumber: value },
      {
        headers: AuthHeader(),
      }
    );
  }
  getUserDetails(id) {
    return axios.post(
      API_USER_DETAILS,
      { id: id },

      {
        headers: AuthHeader(),
      }
    );
  }
  getFundingUpdateDetails(id) {
    return axios.post(
      API_FETCH_FUNDING_UPDATE_DETAILS,
      { id: id },
      {
        headers: AuthHeader(),
      }
    );
  }

  getCsrData() {
    return axios.get(GET_CSR_DATA, { headers: AuthHeader() });
  }
  applyFundingUpdate(data) {
    return axios.post(APPLY_FUNDING_UPDATE, data, {
      headers: AuthHeader(),
    });
  }

  initiatePayment(data) {
    return axios.post(INITIATE_PAYMENT, data, {
      headers: AuthHeader(),
    });
  }
  makePayment(data) {
    return axios.post(MAKE_PAYMENT, data, { headers: AuthHeader() });
  }
  fetchFundingUpdateById(id) {
    return axios.post(
      FETCH_FUNDING_UPDATES_BY_ID,
      { id: id },
      {
        headers: AuthHeader(),
      }
    );
  }

  fetchEventRegistration(id) {
    return axios.post(
      API_FETCH_EVENT_REGISTRATION,
      { id: id },
      {
        headers: AuthHeader(),
      }
    );
  }

  fetchEventsByCategory(category) {
    return axios.post(
      API_FETCH_EVENTS_BY_CATEGORY,
      { eventCategoryId: category, dataType: 1 },
      { headers: AuthHeader() }
    );
  }
  fetchAllEvents() {
    return axios.post(
      API_FETCH_ALL_EVENTS,
      { dataType: 2 },
      { headers: AuthHeader() }
    );
  }
  homeV2(user) {
    return axios.post(
      API_FETCH_HOME,
      { user_id: user },
      { headers: AuthHeader() }
    );
  }
  fetchAllStates(user) {
    return axios.post(
      API_ALL_STATES,
      { user_id: user },
      { headers: AuthHeader() }
    );
  }
}
export default new UserService();
