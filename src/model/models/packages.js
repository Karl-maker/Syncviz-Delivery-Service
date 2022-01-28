const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    description: { type: String },
    type_of_goods: { type: String },
    status: { type: String, default: "PENDING" },
    sent_by: { type: String },
    amount: { type: Number },
    size: {
      unit_amount: { type: Number },
      unit_type: { type: String },
    },
    weight: {
      unit_amount: { type: Number },
      unit_type: { type: String },
    },
    customer_details: {
      name: { type: String },
      contact_name: { type: String },
      email: { type: String },
      phone_number: { type: String },
    },
    instructions: { type: String },
    is_fragile: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    destination: {
      location_link: { type: String }, // Drop Location
      address: {
        type: { type: String, default: "Residential" }, // Commercial
        street: {},
        city: {},
        state: {},
        country: {},
      },
      location: {},
    },
    origin: {
      address: {
        street: {},
        city: {},
        state: {},
        country: {},
      },
      location: {},
    },
    expected_delivery_date: { type: Date },
  },
  {
    timestamps: true,
  }
);

PackageSchema.index({ "destination.location": "2dsphere" });
PackageSchema.index({ "origin.location": "2dsphere" });

const Package = mongoose.model("Packages", PackageSchema);

module.exports = Package;
