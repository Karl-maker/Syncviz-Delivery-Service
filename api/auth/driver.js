import axios from "axios";

export const driverService = {
  login,
  logout,
  authenticate,
};

async function login(email, password) {
  // Login then authenticate as a Driver

  try {
    const result = await axios.post(
      "/api/login",
      { email, password },
      { "content-type": "application/x-www-form-urlencoded" }
    );

    return await authenticate(result.access_token);
  } catch (err) {
    throw err;
  }
}

async function authenticate(access_token) {
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  };

  try {
    return await axios.get("/api/driver", {}, config);
  } catch (err) {
    throw err;
  }
}

function logout() {
  localStorage.removeItem("access_token");
}
