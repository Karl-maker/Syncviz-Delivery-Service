const mongoose = require("mongoose");

const DeliverySchema = new mongoose.Schema(
  {
    driver: { type: String },
    vehicle: { type: String },
    type: { type: String },
    tracking_id: { type: String },
    is_complete: { type: Boolean, default: false },
    date_of_completion: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Delivery = mongoose.model("Deliveries", DeliverySchema);

module.exports = Delivery;
