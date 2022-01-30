const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    delivery_center: { type: String },
    package: { type: String },
  },
  {
    timestamps: true,
  }
);

const Inventory = mongoose.model("Inventories", InventorySchema);

module.exports = Inventory;
