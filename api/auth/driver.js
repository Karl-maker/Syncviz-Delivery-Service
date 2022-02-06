import axios from "axios";

export const driverService = {
  login,
  logout,
  authenticate,
};

async function login(email, password) {
  // Login then authenticate as a Driver

  await axios
    .post(
      "/api/login",
      { email, password },
      { "content-type": "application/x-www-form-urlencoded" }
    )
    .then(async (response) => {
      return await authenticate(response.access_token)
        .then((driver) => {
          return driver;
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
}

async function authenticate(access_token) {
  const config = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token}`,
    },
  };

  return await axios
    .get("/api/driver", {}, config)
    .then((driver) => {
      return driver;
    })
    .catch((err) => {
      throw err;
    });
}

function logout() {
  localStorage.removeItem("access_token");
}
