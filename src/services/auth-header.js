export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // for Node.js Express back-end
    return {
      Accept: "*/*",
      "Content-Type": "application/json",
      user_id: user.userId,
      "Upgrade-Insecure-Requests": 1,
    };
  } else {
    return {};
  }
}
