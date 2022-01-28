const mongoose = require("mongoose");

const AdministratorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Enter Administrator's Email"],
      unique: true,
    },
    administrates: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    permission: {
      level: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Administrator = mongoose.model("Administrators", AdministratorSchema);

module.exports = Administrator;
