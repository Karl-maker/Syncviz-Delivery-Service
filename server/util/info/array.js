async function getArrayItemFromObject(objects, object) {
  /*

  This method is created to get Object Arrays and display them as only arrays by entering their attribute that is wanted

  */
  if (!objects) {
    return [];
  }

  return objects.map((objects) => {
    return objects[object];
  });
}

module.exports = { getArrayItemFromObject };
