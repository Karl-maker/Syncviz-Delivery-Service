const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/inventory";
const config = require("../../../config");
const passport = require("passport");
const { inventory } = require("../../../service");
const { protect } = require("../../../auth/protect");
const { sendEmail } = require("../../../util/email");

function inventoryController(io) {
  router.get(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    getAllByDeliveryCenter
  );
  router.delete(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteInventory
  );
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createInventory
  );

  return router;

  // Controllers

  async function driversOnly(req, res, next) {
    const user = req.user;
    if (await protect(user.email, "Driver", { permission_level: 2 })) {
      next();
    } else {
      next(new Error({ name: "Forbidden", message: "No Access" }));
    }
  }

  async function adminOnly(req, res, next) {
    const user = req.user;
    if (await protect(user.email, "Admin", { permission_level: 4 })) {
      next();
    } else {
      next(new Error({ name: "Forbidden", message: "No Access" }));
    }
  }

  function createInventory(req, res, next) {
    inventory
      .create(req.body.delivery_center, req.body.package)
      .then((inventory) => {
        res.status(200).json({ inventory });
      })
      .catch((err) => next(err));
  }

  function getAllByDeliveryCenter(req, res, next) {
    inventory
      .getManyByDeliveryCenter(
        req.query.delivery_center_id,
        req.query.page_size,
        req.query.page_number
      )
      .then((packages) => {
        res.status(200).json({ packages });
      })
      .catch((err) => next(err));
  }

  function deleteInventory(req, res, next) {
    inventory
      .delete(req.params.package_id)
      .then((packages) => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }
}
module.exports = { inventoryController };
