const mongoose = require("mongoose");

const UpdateSchema = new mongoose.Schema(
  {
    tracking_id: { type: String },
    status: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Update = mongoose.model("Updates", UpdateSchema);

module.exports = Update;
