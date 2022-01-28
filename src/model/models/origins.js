const mongoose = require("mongoose");

const OriginSchema = new mongoose.Schema(
  {
    url: { type: String },
    permission_level: { type: Number },
    actions: [], // GET, POST
    description: { type: String },
    contact_info: {},
  },
  {
    timestamps: true,
  }
);

const Origin = mongoose.model("Origins", OriginSchema);

module.exports = Origin;
