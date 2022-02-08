const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/update";
const { update } = require("../../../service");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function updateController(io) {
  router.post(
    `${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    createUpdate
  );
  router.delete(
    `${TOP_ROUTE}/:update_id`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    deleteUpdate
  );
  router.get(`${TOP_ROUTE}s/:tracking_id`, getAllUpdates);

  return router;

  // Controllers

  async function adminOnly(req, res, next) {
    const user = req.user;
    if (await protect(user.email, "Admin", { permission_level: 4 })) {
      next();
    } else {
      next(new Error({ name: "Forbidden", message: "No Access" }));
    }
  }

  function getAllUpdates(req, res, next) {
    update
      .getAll(req.params.tracking_id)
      .then((updates) => {
        res.status(200).json({ updates });
      })
      .catch((err) => next(err));
  }

  function createUpdate(req, res, next) {
    update
      .create(req.body.tracking_id, req.body.status, req.body.description)
      .then((update) => {
        res.status(200).json({ update });
      })
      .catch((err) => next(err));
  }

  function deleteUpdate(req, res, next) {
    update
      .delete(req.params.update_id)
      .then(() => {
        res.status(200).json({ message: "Deleted Successfully" });
      })
      .catch((err) => next(err));
  }
}

module.exports = { updateController };
