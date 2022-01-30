const express = require("express");
const router = express.Router();
const TOP_ROUTE = "package";
const trackingNameSpace = "/package-tracking";
const config = require("../../../config");
const passport = require("passport");
const { package } = require("../../../service");
const { protect } = require("../../../auth/protect");
const { sendEmail } = require("../../../util/email");
const {
  displayDate,
  mongoDBTimeConverter,
} = require("../../../util/info/date");

function packageController(io) {
  router.get(
    `/my-${TOP_ROUTE}s`,
    passport.authenticate("jwt", { session: false }),
    getAllMyPackagesByEmail
  );
  router.get(
    `/${TOP_ROUTE}s`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    getAllPackages
  );
  router.get(`/${TOP_ROUTE}/:tracking_id`, getPackageByTrackingId);
  router.put(
    `/${TOP_ROUTE}/:tracking_id`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    setPackageStatus
  );
  router.post(
    `/${TOP_ROUTE}`,
    passport.authenticate("jwt", { session: false }),
    createPackage
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

  function getAllPackages(req, res, next) {
    const {
      page_size,
      page_number,
      city,
      country,
      longitude,
      latitude,
      status,
      range,
      min_distance,
      max_distance,
      location_type,
    } = req.query;

    package
      .getAll({
        page_size,
        page_number,
        city,
        country,
        longitude,
        latitude,
        status,
        max_distance,
        location_type,
      })
      .then((packages) => {
        res.status(200).json({ packages });
      })
      .catch((err) => next(err));
  }

  function getAllMyPackagesByEmail(req, res, next) {
    const email = req.user.email;
    const { page_size, page_number } = req.query;

    package
      .getAllByEmail(email, page_size, page_number)
      .then((packages) => {
        res.status(200).json({ packages });
      })
      .catch((err) => next(err));
  }

  function createPackage(req, res, next) {
    const {
      description,
      size,
      weight,
      customer_details,
      instructions,
      is_fragile,
      destination,
      origin,
      expected_delivery_date,
    } = req.body;
    package
      .create({
        description,
        size,
        weight,
        customer_details,
        instructions,
        is_fragile,
        destination,
        origin,
        expected_delivery_date,
        sent_by: req.user.email,
      })
      .then(({ package }) => {
        const date = mongoDBTimeConverter(package.date_of_delivery).full_date;

        try {
          sendEmail(
            package.customer_details.email,
            "Delivery Service",
            {
              header: "A Package For You",
              paragraph: `Hello ${package.customer_details.name}, a package is scheduled to be deliveried to you at ${date}. Thank you for using our service.`,
              date_of_delivery: date,
              link: `${config.client.PROTOCOL}://${config.client.URL}/${package._id}`,
              link_info: "Check Package Journey",
            },
            "basicWithLink"
          );
        } catch (err) {}

        res.status(200).json({ package });
      })
      .catch((err) => next(err));
  }

  function getPackageByTrackingId(req, res, next) {
    const tracking_id = req.params.tracking_id;

    package
      .getByTrackingId(tracking_id)
      .then((package) => {
        res.status(200).json({ package });
      })
      .catch((err) => next(err));
  }

  function setPackageStatus(req, res, next) {
    const tracking_id = req.params.tracking_id;
    const details = req.body;
    package
      .setStatus(tracking_id, details)
      .then(({ package, updates }) => {
        io.of(trackingNameSpace).to(tracking_id).emit("package", {
          prompt: "Package Status Updated",
          package,
        });

        io.of(trackingNameSpace).to(tracking_id).emit("updates", {
          prompt: "Package Status Updated",
          updates,
        });

        try {
          const date = mongoDBTimeConverter(package.date_of_delivery).full_date;

          sendEmail(
            package.customer_details.email,
            "Package Update",
            {
              header: "Package Details",
              paragraph: `Hello ${package.customer_details.name}, your package is now in ${package.status}`,
              date_of_delivery: date,
              link: `${config.client.PROTOCOL}://${config.client.URL}/${package._id}`,
              link_info: "Check Package Journey",
            },
            "basicWithLink"
          );
        } catch (err) {}

        res.status(200).json({ package, updates });
      })
      .catch((err) => next(err));
  }
}
module.exports = { packageController };
