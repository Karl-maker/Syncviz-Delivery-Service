const { package, delivery } = require("../../../service");
const package_service = package;
const TRACKPACKAGE_NAMESPACE = "/package-tracking";
const UPDATEPACKAGE_NAMESPACE = "/package-update";
const wrapper = require("../../../middleware/wrapper");
const passport = require("passport");
const { protect } = require("../../../auth/protect");

function packageLiveTrackingHandler(io) {
  const trackPackageNameSpace = io.of(TRACKPACKAGE_NAMESPACE);
  const packageUpdateNameSpace = io.of(UPDATEPACKAGE_NAMESPACE);

  trackPackageNameSpace.on("connection", track_package_events);
  packageUpdateNameSpace.use(
    wrapper(passport.authenticate("jwt", { session: false }))
  );
  packageUpdateNameSpace.use(driversOnly);
  packageUpdateNameSpace.on("connection", package_update_events);

  async function track_package_events(socket) {
    //Default Action

    const tracking_id = socket.handshake.query.tracking_id;
    socket.join(tracking_id);

    await getPackageDetails(socket);
    await getDeliveryDetails(socket);

    async function getPackageDetails(socket) {
      const tracking_id = socket.handshake.query.tracking_id;

      await package_service
        .getByTrackingId(tracking_id)
        .then(({ package, updates }) => {
          socket.emit("updates", { updates });
          socket.emit("package", { package });
        })
        .catch((err) => {
          next(err);
        });
    }

    async function getDeliveryDetails(socket) {
      const tracking_id = socket.handshake.query.tracking_id;
      await delivery
        .getOneByTrackingNumber(tracking_id)
        .then((delivery) => {
          socket.emit("delivery", { delivery });
        })
        .catch((err) => {
          next(err);
        });
    }
  }

  async function package_update_events(socket) {
    socket.on("location", await setCurrentPackageLocation);

    async function setCurrentPackageLocation(args) {
      socket.emit("location", { location: args.location });

      trackPackageNameSpace
        .to(args.packages)
        .emit("location", { location: args.location });
    }
  }

  async function driversOnly(socket, next) {
    const user = socket.request.user;
    if (await protect(user.email, "Driver", { permission_level: 3 })) {
      next();
    } else {
      next(new Error({ name: "Forbidden", message: "No Access" }));
    }
  }
}

module.exports = {
  packageLiveTrackingHandler,
};
