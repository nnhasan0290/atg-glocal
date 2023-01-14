import axios from "axios";

import { API_URL_USER, SIGN_IN_WITH_GOOGLE } from "../constants/urls";

class AuthService {
  login(email, password, number) {
    const data = {
      contactNumber: number,
      email: email,
      password: password,
      deviceType: "Android",
      accountType: "Email",
      appVersion: "1.1",
      fcmAndroidToken: "",
    };
    return axios.post(API_URL_USER + "login/", data).then((response) => {
      if (response.data.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, number) {
    const data = {
      accountType: "Email",
      appVersion: "1.0",
      contactNumber: number,
      deviceType: "Android",
      fcmToken: "",
      name: username,
      password: password,
      email: email,
    };

    return axios.post(API_URL_USER + "signUp/", data);
  }

  forgotPassword(email) {
    const data = {
      email,
    };
    return axios.post(API_URL_USER + "forgotPassword/", data);
  }

  resetPassword(newPassword, requestId) {
    const data = {
      newPassword,
      requestId,
    };
    return axios.post(API_URL_USER + "resetPassword/", data);
  }
  loginWithGoogle(authToken) {
    const data = {
      authToken: authToken,
      deviceType: "Web",
      accountType: "Email",
      appVersion: "1.1",
      fcmAndroidToken: "",
    };
    return axios.post(SIGN_IN_WITH_GOOGLE, data).then((response) => {
      if (response.data.status === 1) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
  }
}

export default new AuthService();
