const express = require("express");
const router = express.Router();
const TOP_ROUTE = "/delivery";
const config = require("../../../config");
const passport = require("passport");
const trackingNameSpace = "/package-tracking";
const { protect } = require("../../../auth/protect");
const { delivery, package } = require("../../../service");
const { sendEmail } = require("../../../util/email");
const { displayDate, getDate } = require("../../../util/info/date");

function deliveryController(io) {
  router.post(
    `${TOP_ROUTE}/:tracking_id`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    driverStartDelivery
  );

  router.post(
    `${TOP_ROUTE}/admin/:tracking_id`,
    passport.authenticate("jwt", { session: false }),
    adminOnly,
    adminStartDelivery
  );

  router.delete(
    `${TOP_ROUTE}/:tracking_id`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    endDelivery
  );
  router.put(
    `${TOP_ROUTE}/:tracking_id`,
    passport.authenticate("jwt", { session: false }),
    driversOnly,
    completeDelivery
  );

  router.get(`${TOP_ROUTE}/:tracking_id`, getDeliveryByTrackingNumber);

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

  function getDeliveryByTrackingNumber(req, res, next) {
    const { tracking_id } = req.params;

    delivery
      .getOneByTrackingNumber(tracking_id)
      .then((delivery) => {
        res.status(200).json({ delivery });
      })
      .catch((err) => next(err));
  }

  function completeDelivery(req, res, next) {
    const { email } = req.user;
    const { tracking_id } = req.params;

    delivery
      .setAsCompleteByTrackingNumber(tracking_id, email)
      .then((delivery) => {
        io.of(trackingNameSpace)
          .to(tracking_id)
          .emit("delivery", { prompt: "Delivery Completed", delivery });

        package
          .getByTrackingId(tracking_id)
          .then((package) => {
            const package_detail = package.package;
            sendEmail(
              package_detail.customer_details.email,
              "Package On The Way",
              {
                header: "Delivery Completed",
                paragraph: `Hello ${
                  package_detail.customer_details.name
                }, your delivery has been completed at ${getDate()}. Thank you for using our service, if you didn't recieve your package please contact us.`,
                date_of_delivery: getDate(),
                link: `${config.client.URL}/package/${tracking_id}`,
                link_info: "Check Package Journey",
              },
              "basicWithLink"
            );
          })
          .catch((err) => {});

        res.status(200).json({ delivery });
      })
      .catch((err) => next(err));
  }

  function adminStartDelivery(req, res, next) {
    const { email } = req.body;
    startDelivery(req, res, next, email);
  }

  function driverStartDelivery(req, res, next) {
    const { email } = req.user;
    startDelivery(req, res, next, email);
  }

  function startDelivery(req, res, next, email) {
    const { vehicle_used, type } = req.body;
    const { tracking_id } = req.params;

    delivery
      .create({ by: email, tracking_id, vehicle_used, type })
      .then((delivery) => {
        io.of(trackingNameSpace)
          .to(tracking_id)
          .emit("delivery", { prompt: "Delivery Started", delivery });

        package
          .getByTrackingId(tracking_id)
          .then((package) => {
            const package_detail = package.package;
            if (type === "DROPOFF") {
              sendEmail(
                package_detail.customer_details.email,
                "Package On The Way",
                {
                  header: "We Are On The Way",
                  paragraph: `Hello ${package_detail.customer_details.name}, your package is on the way. Thank you for using our service.`,
                  date_of_delivery: getDate(),
                  link: `${config.client.URL}/package/${tracking_id}`,
                  link_info: "Track Your Package Live",
                },
                "basicWithLink"
              );
            } else if (type === "PICKUP") {
              const package_detail = package.package;
              sendEmail(
                package_detail.sent_by,
                "Ready For Pick Up",
                {
                  header: "We Are On The Way",
                  paragraph: `Hello, package with the ID #${package_detail._id} will be picked up today. Thank you for using our service.`,
                  date_of_delivery: getDate(),
                  link: `${config.client.URL}/package/${tracking_id}`,
                  link_info: "Check package details",
                },
                "basicWithLink"
              );
            }
          })
          .catch((err) => {});

        res.status(200).json({ delivery });
      })
      .catch((err) => next(err));
  }

  function endDelivery(req, res, next) {
    const { email } = req.user;
    const { tracking_id } = req.params;

    delivery
      .delete(tracking_id, email)
      .then(() => {
        io.of(trackingNameSpace)
          .to(tracking_id)
          .emit("delivery", { prompt: "Delivery Ended" });

        package
          .getByTrackingId(tracking_id)
          .then((package) => {
            const package_detail = package.package;
            sendEmail(
              package_detail.customer_details.email,
              "Delivery Cancelled",
              {
                header: "Delivery Completed",
                paragraph: `Hello ${
                  package_detail.customer_details.name
                }, your delivery has been cancelled at ${getDate()}. We apologize for the inconvenience.`,
                date_of_delivery: getDate(),
                link: `${config.client.URL}/package/${tracking_id}`,
                link_info: "View More Details",
              },
              "basicWithLink"
            );
          })
          .catch((err) => {});

        res.status(200).json({ delivery });
      })
      .catch((err) => next(err));
  }
}
module.exports = { deliveryController };
