const { Package, Update, Delivery, Inventory } = require("../../model");
const config = require("../../config");
const logger = require("../../log/server");
const { displayDate, getDate } = require("../../util/info/date");
const update = require("./update");
const PROVIDER = config.nodeGeocoder.PROVIDER;
const nodeGeocoder = require("node-geocoder");
let options = {
  provider: PROVIDER,
};

module.exports = {
  getByTrackingId,
  setStatus,
  create,
  getAll,
};

async function getAll({
  page_size,
  page_number,
  city,
  country,
  longitude,
  latitude,
  status,
  max_distance,
  location_type,
}) {
  page_size = parseInt(page_size, 10);
  page_number = parseInt(page_number, 10);
  longitude = parseFloat(longitude, 10);
  latitude = parseFloat(latitude, 10);
  max_distance = parseFloat(max_distance, 10);

  if (page_size > 10) {
    page_size = 10;
  }

  const page = Math.max(0, page_number);
  const skip = page_number * page_size;
  const order = "asc";
  let query, packages;

  // Location Type

  if (isNaN(longitude) && isNaN(latitude)) {
    if (location_type === "origin") {
      query = {
        "origin.address.city": city,
        "origin.address.country": country,
      };
    } else {
      query = {
        "destination.address.city": city,
        "destination.address.country": country,
      };
    }

    packages = await Package.aggregate([
      {
        $match: {
          ...query,
          status,
        },
      },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { page: page_number } },
          ],
          data: [{ $skip: skip }, { $limit: page_size }],
        },
      },
    ]);
  } else {
    // GeoSearch

    packages = await Package.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [latitude, longitude] },
          distanceField: "distance.calulation",
          maxDistance: max_distance,
          query: { status: status },
          key: `${location_type}.location`,
          includeLocs: "distance.location",
          $limit: page_size,
          spherical: true,
        },
      },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            { $addFields: { page: page_number } },
          ],
          data: [{ $skip: skip }, { $limit: page_size }],
        },
      },
    ]);
  }

  return packages;
}

async function getAllByEmail(email, page_size, page_number) {
  page_size = parseInt(page_size, 10);
  const page = Math.max(0, page_number);
  const order = "asc";

  const packages = await Package.find({ sent_by: email })
    .limit(page_size)
    .skip(page_size * page)
    .sort(order); // get all

  return packages;
}

async function getByTrackingId(tracking_id) {
  const package = await Package.findOne({ _id: tracking_id });
  const updates = await update.getAll(tracking_id);

  return { package, updates };
}

async function create({
  description,
  type_of_goods,
  amount,
  sent_by,
  size,
  weight,
  customer_details,
  instructions,
  is_fragile,
  destination,
  origin,
  expected_delivery_date,
}) {
  let geoCoder = nodeGeocoder(options);

  try {
    let origin_location = await geoCoder.geocode(
      `${origin.address.street}, ${origin.address.city}, ${origin.address.country}`
    );

    origin.location = {
      type: "Point",
      coordinates: [origin_location[0].latitude, origin_location[0].longitude],
    };
  } catch (err) {
    logger.error({
      name: "Cannot Resolve Location",
      message: err,
    });
  }

  try {
    let destination_location = await geoCoder.geocode(
      `${destination.address.street}, ${destination.address.city}, ${destination.address.country}`
    );

    destination.location = {
      type: "Point",
      coordinates: [
        destination_location[0].latitude,
        destination_location[0].longitude,
      ],
    };
  } catch (err) {
    logger.error({
      name: "Cannot Resolve Location",
      message: err,
    });
  }

  const package = await new Package({
    description,
    type_of_goods,
    amount,
    size,
    sent_by,
    weight,
    customer_details,
    instructions,
    is_fragile,
    destination,
    origin,
    expected_delivery_date,
  });

  await package.save();

  await Update.create({ tracking_id: package._id, status: "PENDING" });
  const updates = await Update.find({ tracking_id: package._id });

  return { package, updates };
}

async function setStatusCancelled(tracking_id, description) {
  await Package.findOneAndUpdate({ _id: tracking_id }, { status: "CANCELLED" });

  await Update.create({
    tracking_id,
    status: "CANCELLED",
    description: description,
  });

  const updates = await update.getAll(tracking_id);

  const package = await Package.findOne({ _id: tracking_id });

  return { package, updates };
}

async function setStatusInProgress(tracking_id, description) {
  await Package.findOneAndUpdate(
    { _id: tracking_id },
    {
      status: "OUT_FOR_DELIVERY",
    }
  );

  const package = await Package.findOne({ _id: tracking_id });

  await Update.create({
    tracking_id,
    status: "OUT_FOR_DELIVERY",
    description,
  });

  const updates = await update.getAll(tracking_id);

  return { package, updates };
}

async function setStatusComplete(tracking_id, description) {
  await Package.findOneAndUpdate(
    { _id: tracking_id },
    { status: "DELIVERIED" }
  );

  await Update.create({
    tracking_id,
    status: "DELIVERIED",
    description,
  });

  const updates = await update.getAll(tracking_id);

  try {
    await Inventory.findOneAndRemove({
      package: tracking_id,
    });
  } catch (err) {
    //
  }

  const package = await Package.findOne({ _id: tracking_id });

  return { package, updates };
}

async function setStatusTransit(tracking_id, description) {
  await Package.findOneAndUpdate(
    { _id: tracking_id },
    { status: "IN_TRANSIT" }
  );

  await Update.create({
    tracking_id,
    status: "IN_TRANSIT",
    description,
  });

  const updates = await update.getAll(tracking_id);

  const package = await Package.findOne({ _id: tracking_id });

  return { package, updates };
}

async function setStatusReady(tracking_id, description, delivery_center) {
  await Package.findOneAndUpdate(
    { _id: tracking_id },
    { status: "READY_FOR_DELIVERY" }
  );

  await Update.create({
    tracking_id,
    status: "READY_FOR_DELIVERY",
    delivery_center: delivery_center || null,
    description,
  });

  const updates = await update.getAll(tracking_id);

  if (delivery_center) {
    await Inventory.create({
      package: tracking_id,
      delivery_center: delivery_center,
    });
  }

  const package = await Package.findOne({ _id: tracking_id });

  return { package, updates };
}

async function setStatus(tracking_id, details) {
  let results;

  if (details.status === "CANCELLED") {
    results = await setStatusCancelled(tracking_id, details.description);
  } else if (details.status === "OUT_FOR_DELIVERY") {
    results = await setStatusInProgress(tracking_id, details.description);
  } else if (details.status === "IN_TRANSIT") {
    results = await setStatusTransit(tracking_id, details.description);
  } else if (details.status === "DELIVERIED") {
    results = await setStatusComplete(tracking_id, details.description);
  } else if (details.status === "READY_FOR_DELIVERY") {
    results = await setStatusReady(
      tracking_id,
      details.description,
      details.delivery_center
    );
  } else {
    return;
  }

  return results;
}
