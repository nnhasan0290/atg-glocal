import axios from "axios";

import { LOCATION_API_TOKEN_URL } from "../constants/urls";

class StateService {
  getStates() {
    let authHedaers = {
      "api-token":
        "CBEdiX1pIrRjluxedojgXKesZcUK7pT2G3xJX-rq7vzzVH5nLJl0rav5yW6asHo8vD4",
      "user-email": "coldaka801@gmail.com",
    };
    let h1;
    let headers = {};
    return axios
      .get(LOCATION_API_TOKEN_URL, { headers: authHedaers })
      .then((response) => {
        h1 = "Bearer " + response.data.auth_token;

        headers = {
          Authorization: h1,
        };
        localStorage.setItem("Authorization", h1);

        return axios
          .get("https://www.universal-tutorial.com/api/states/india", {
            headers: headers,
          })
          .then((res) => {
            return res;
          });
      });
  }
}

export default new StateService();
