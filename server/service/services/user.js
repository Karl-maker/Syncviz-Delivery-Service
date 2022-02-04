const { User } = require("../../model");
const bcrypt = require("bcrypt");
const config = require("../../config");

module.exports = {
  create,
  delete: _delete,
  getOneByEmail,
};

async function create({ email, first_name, last_name, password }) {
  var user = await new User({
    first_name,
    last_name,
    email,
    password,
  });
  await user.save();

  return user;
}

async function _delete(email) {
  await User.deleteOne({ email: email });

  return;
}

async function getOneByEmail(email) {
  var user = await User.findOne({ email });

  return user;
}
