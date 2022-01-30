// Get user info to protect endpoints

const { Administrator, Driver } = require("../model");

async function protect(email, account_type, { permission_level }) {
  //Protect with Admin, Driver and Business Managers

  if (await checkIfAdminWithPermission(email, permission_level)) {
    return true;
  }

  switch (true) {
    case account_type === "Driver":
      if (await checkIfDriver(email)) {
        return true;
      } else {
        return false;
      }
      break;
    default:
      return false;
      break;
  }

  return false;
}

module.exports = { protect };

async function checkIfAdminWithPermission(email, permission_level) {
  return await Administrator.exists({
    email,
    permission_level: { $gte: permission_level },
  });
}

async function checkIfDriver(email) {
  return await Driver.exists({ email });
}
