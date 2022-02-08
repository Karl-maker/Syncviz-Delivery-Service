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

const mongoDBTimeConverter = (input_date) => {
  let created_date = new Date(input_date);

  let year = created_date.getFullYear();
  let month = monthNames[created_date.getMonth()];
  let date = created_date.getDate();
  let hour = created_date.getHours();
  let min = created_date.getMinutes();
  let sec = created_date.getSeconds();
  let day_nth = created_date.getDate() + nth(created_date.getDate());
  let full_time = hour + ":" + min + ":" + sec;
  let full_date = day_nth + ", " + month + " " + year; // final date with time, you can use this according your requirement

  return { full_date, full_time };
};
export { getDate, displayDate, mongoDBTimeConverter };
