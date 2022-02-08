const { Delivery } = require("../../model");

module.exports = {
  create,
  setAsCompleteByTrackingNumber,
  delete: _delete,
  getOneByTrackingNumber,
};

async function create({ by, vehicle_used, tracking_id, type }) {
  let delivery = await new Delivery({
    by,
    type,
    with: vehicle_used,
    tracking_id,
  });
  await delivery.save();

  return delivery;
}

async function setAsCompleteByTrackingNumber(tracking_id, email) {
  await Delivery.findOneAndUpdate(
    { tracking_id, email },
    { is_complete: true, date_of_completion: new Date() }
  );

  return;
}

async function _delete(tracking_id, email) {
  await Delivery.findOneAndRemove({ tracking_id: tracking_id, by: email });
  return;
}

async function getOneByTrackingNumber(tracking_id) {
  let delivery = await Delivery.findOne({ tracking_id: tracking_id });
  return delivery;
}
