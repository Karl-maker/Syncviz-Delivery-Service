const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const config = require("../../config");

const saltOrRounds = config.bcrypt.SALTORROUNDS;

//const

const MIN_NAME = 1;
const MAX_NAME = 100;
const MIN_EMAIL = 3;
const MAX_EMAIL = 400;

//--------------------------------------------------------------------------------

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please use a valid email address",
      ],
      trim: true,
      minLength: [MIN_EMAIL, `Please use a valid email address`],
      maxLength: [MAX_EMAIL, `Please use a valid email address`],
      index: true,
    },
    first_name: {
      type: String,
      required: [false, "First name is required"],
      trim: true,
      minLength: [
        MIN_NAME,
        `First name must have more than ${MIN_NAME} characters`,
      ],
      maxlength: [
        MAX_NAME,
        `First name must have less than ${MAX_NAME} characters`,
      ],
    },
    last_name: {
      type: String,
      required: [false, "Last name is required"],
      trim: true,
      minLength: [
        MIN_NAME,
        `First name must have more than ${MIN_NAME} characters`,
      ],
      maxlength: [
        MAX_NAME,
        `Last name must have less than ${MAX_NAME} characters`,
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: 0,
    },
    is_confirmed: { type: Boolean, default: 0 },
    account_type: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  var encrypted_password = await bcrypt.hash(this.password, saltOrRounds);
  this.password = encrypted_password;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;

  var isValid = await bcrypt.compare(password, this.password);

  return isValid;
};

const User = mongoose.model("Users", UserSchema);

module.exports = User;
