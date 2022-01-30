const { Update } = require("../../model");

module.exports = { create, delete: _delete, getAll };

async function getAll(tracking_id) {
  const updates = await Update.find({
    tracking_id,
  }).lean();

  return updates;
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
