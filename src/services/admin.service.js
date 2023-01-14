import axios from "axios";
import {
  API_FETCH_JOBS_TO_REVIEW,
  API_REVIEW_JOB,
  API_URL_CREATE_NEWS,
  API_URL_FETCH_NEWS,
  API_URL_DELETE_JOB,
  API_URL_DELETE_NEWS,
  API_FETCH_JOBS_USER,
  API_FETCH_EVENTS_BY_CATEGORY,
  API_URL_DELETE_AWARD,
  API_URL_DELETE_EXHIBITION,
  API_URL_DELETE_WORKSHOP,
  API_DELETE_FUNDING_UPDATE,
  API_DELETE_RFP,
  API_FETCH_FUNDING_UPDATE,
  API_FETCH_RFP,
  GET_KYC_LIST,
  API_DELETE_ACADEMICS,
  API_FETCH_ACADEMICS,
  API_SEARCH_USER,
  API_UPDATE_ROLE,
  API_MONTHLY_REFERREL_DATA,
  API_FETCH_USER_BETWEEN_DATES,
  API_FETCH_EVENT_REGISTRATION,
  API_FETCH_JOBS_BY_CATEGORY,
  API_FETCH_FU_BY_CATEGORY,
  API_FETCH_EVENT_TO_REVIEW,
  API_FETCH_FUNDING_UPDATE_TO_REVIEW,
  API_REVIEW_EVENT,
} from "../constants/urls";

import AuthHeader from "./auth-header";

class AdminService {
  fetchJobs() {
    return axios.post(API_FETCH_JOBS_TO_REVIEW, {}, { headers: AuthHeader() });
  }
  reviewJob(data) {
    return axios.post(API_REVIEW_JOB, data, {
      headers: AuthHeader(),
    });
  }

  createNews(data) {
    return axios.post(API_URL_CREATE_NEWS, data, {
      headers: AuthHeader(),
    });
  }

  fetchNews() {
    return axios.post(
      API_URL_FETCH_NEWS,
      {},
      {
        headers: AuthHeader(),
      }
    );
  }
  deleteNews(id) {
    return axios.post(
      API_URL_DELETE_NEWS,
      { id: id },
      {
        headers: AuthHeader(),
      }
    );
  }
  deleteJob(id) {
    return axios.post(
      API_URL_DELETE_JOB,
      { id: id },
      {
        headers: AuthHeader(),
      }
    );
  }
  fetchAllJobs() {
    return axios.post(
      API_FETCH_JOBS_USER,
      { dataType: 1 },
      {
        headers: AuthHeader(),
      }
    );
  }
  fetchJobsByCategory(categoryId, dataType) {
    return axios.post(
      API_FETCH_JOBS_BY_CATEGORY,
      { jobCategoryId: categoryId, dataType: dataType },
      { headers: AuthHeader() }
    );
  }

  // nazmulHasan =============
  fetchEvents() {
    return axios.post(API_FETCH_EVENT_TO_REVIEW, {}, { headers: AuthHeader() });
  }

  reviewEvent(data) {
    return axios.post(API_REVIEW_EVENT, data, {
      headers: AuthHeader(),
    });
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

  fetchEventsByCategory(category, dataType) {
    return axios.post(
      API_FETCH_EVENTS_BY_CATEGORY,
      { eventCategoryId: category, dataType: dataType },
      { headers: AuthHeader() }
    );
  }
  deleteAward(id) {
    return axios.post(
      API_URL_DELETE_AWARD,
      { id: id },
      { headers: AuthHeader() }
    );
  }
  deleteExhibition(id) {
    return axios.post(
      API_URL_DELETE_EXHIBITION,
      { id: id },
      { headers: AuthHeader() }
    );
  }
  deleteWorkshop(id) {
    return axios.post(
      API_URL_DELETE_WORKSHOP,
      { id: id },
      { headers: AuthHeader() }
    );
  }
  //nazmulHasan -------------------------
  fetchFundingUpdates() {
    return axios.post(
      API_FETCH_FUNDING_UPDATE_TO_REVIEW,
      {},
      { headers: AuthHeader() }
    );
  }
  fetchFundingUpdate(data) {
    return axios.post(API_FETCH_FUNDING_UPDATE, data, {
      headers: AuthHeader(),
    });
  }
  fetchFundingUpdateByCategory(categoryId, dataType) {
    return axios.post(
      API_FETCH_FU_BY_CATEGORY,
      { fundingUpdateCategoryId: categoryId, dataType: dataType },
      { headers: AuthHeader() }
    );
  }
  fetchRFP() {
    return axios.post(
      API_FETCH_RFP,
      { dataType: 1 },
      { headers: AuthHeader() }
    );
  }
  deleteFundingUpdate(id) {
    return axios.post(
      API_DELETE_FUNDING_UPDATE,
      { id: id },
      { headers: AuthHeader() }
    );
  }
  deleteRFP(id) {
    return axios.post(API_DELETE_RFP, { id: id }, { headers: AuthHeader() });
  }
  getKycList() {
    return axios.post(
      GET_KYC_LIST,
      {
        pageNumber: 0,
        pageSize: 1000,
      },
      { headers: AuthHeader() }
    );
  }
  deleteAcademics(id) {
    return axios.post(
      API_DELETE_ACADEMICS,
      { id: id },
      { headers: AuthHeader() }
    );
  }
  fetchAcademics() {
    return axios.post(
      API_FETCH_ACADEMICS,
      { dataType: "1" },
      { headers: AuthHeader() }
    );
  }
  searchUser(data) {
    return axios.post(
      API_SEARCH_USER,
      { queryText: data },
      { headers: AuthHeader() }
    );
  }
  updateRole(id, newRole) {
    return axios.post(
      API_UPDATE_ROLE,
      { userId: id, type: newRole },
      { headers: AuthHeader() }
    );
  }
  getMonthlyReferrelSummary(id) {
    return axios.post(
      API_MONTHLY_REFERREL_DATA,
      { id: id },
      { headers: AuthHeader() }
    );
  }
  getUsersBetweenDates(from, to) {
    return axios.post(
      API_FETCH_USER_BETWEEN_DATES,
      { fromDate: from, toDate: to },
      { headers: AuthHeader() }
    );
  }
}

export default new AdminService();
