import {
  capitalizeFirstLetter,
  replaceUnderScoreWithSpace,
} from "./character-manipulation";

function DisplayUnknownObject({ object, displayId, replaceId }) {
  /*

  object - { OBJECT to display }
  displayId - Boolean if _id should be displayed
  replaceId - "String", what to replace _id with?... example: Tracking Number

  */
  return Object.keys(object).map((key) => {
    return (
      <>
        {key === "_id" && !displayId ? (
          <></>
        ) : key === "_id" && replaceId ? (
          <li>{`${replaceId}: ${object[key]}`}</li>
        ) : (
          <li>{`${replaceUnderScoreWithSpace(capitalizeFirstLetter(key))}: ${
            object[key]
          }`}</li>
        )}
      </>
    );
  });
}

function DisplayUnknownArrayObject({ object, displayId, replaceId }) {
  return object.map((d) => (
    <ul>
      <DisplayUnknownObject
        object={d}
        displayId={displayId}
        replaceId={replaceId}
      />
    </ul>
  ));
}

export { DisplayUnknownArrayObject, DisplayUnknownObject };
