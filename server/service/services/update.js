const { Update } = require("../../model");

module.exports = { create, delete: _delete, getAll, getCurrent };

async function getAll(tracking_id) {
  const updates = await Update.find({
    tracking_id,
  }).lean();

  return updates;
}

async function getCurrent(tracking_id) {
  // Get Latest
  const update = await Update.findOne({
    tracking_id,
  });
}

async function create(tracking_id, status, description) {
  const update = await Update.create({
    tracking_id,
    status,
    description,
  });

  return update;
}

async function _delete(id) {
  await Update.findOneAndRemove({
    _id: id,
  });

  return;
}
