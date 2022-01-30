const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const d = new Date();

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

function getDate() {
  return `${monthNames[d.getMonth()]} ${d.getDate()}${nth(
    d.getDate()
  )}, ${d.getFullYear()}`;
}

function displayDate(date) {
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const day_nth = date.getDate() + nth(date.getDate());

  return { month, day, year, day_nth };
}

const mongoDBTimeConverter = (date) => {
  var created_date = new Date(date);

  var year = created_date.getFullYear();
  var month = monthNames[created_date.getMonth()];
  var date = created_date.getDate();
  var hour = created_date.getHours();
  var min = created_date.getMinutes();
  var sec = created_date.getSeconds();
  var day_nth = created_date.getDate() + nth(created_date.getDate());
  var full_time = hour + ":" + min + ":" + sec;
  var full_date = day_nth + ", " + month + " " + year; // final date with time, you can use this according your requirement

  return { full_date, full_time };
};
export { getDate, displayDate, mongoDBTimeConverter };
