function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function replaceUnderScoreWithSpace(string) {
  return string.split("_").join(" ");
}

function capitalizeEveryFirstLetter(str) {
  let splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

export {
  capitalizeFirstLetter,
  replaceUnderScoreWithSpace,
  capitalizeEveryFirstLetter,
};
