const dayjs = require('dayjs');

const getDifferenceOfTwoDatesInTime = (currentDate, toDate) => {
  const hours = toDate.diff(currentDate, 'hour');
  currentDate = currentDate.add(hours, 'hour');
  const minutes = toDate.diff(currentDate, 'minute');
  currentDate = currentDate.add(minutes, 'minute');
  const seconds = toDate.diff(currentDate, 'second');
  currentDate = currentDate.add(seconds, 'second');
  if (hours) {
    return `${hours} hour, ${minutes} minute and ${seconds} second`;
  }
  return `${minutes} minute and ${seconds} second`;
};

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

function calculateExpirationDate(date, expireAfter) {

  if (!expireAfter) {
    return null;
  }

  let units = expireAfter.split(' ');
  let duration = parseInt(units[0]);
  let unit = units[1].toLowerCase();

  let dayJsDate = dayjs(date);

  if (['day', 'days'].includes(unit)) {
    return dayJsDate.add(duration, 'day').toDate();
  } else if (['month', 'months'].includes(unit)) {
    return dayJsDate.add(duration, 'month').toDate();
  } else {
    throw new Error('Invalid unit. Only "days" and "months" are supported.');
  }
}

function formatDateAdv(dateString, format) {
  const date = new Date(dateString);

  const yyyy = date.getFullYear();
  const yy = String(yyyy).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const m = date.getMonth() + 1;
  const dd = String(date.getDate()).padStart(2, "0");
  const d = date.getDate();
  const dayOfMonthSuffix = (() => {
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
  })();

  const monthNamesFull = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];
  const monthNamesShort = [
    "Jan", "Feb", "Mar", "Apr",
    "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
  ];

  const replacements = {
    d: dd,
    j: d,
    S: dayOfMonthSuffix,
    m: mm,
    n: m,
    F: monthNamesFull[date.getMonth()],
    M: monthNamesShort[date.getMonth()],
    Y: yyyy,
    y: yy
  };

  // Replace format placeholders with actual values
  let formattedDate = format.replace(/(d|j|S|m|n|F|M|Y|y)/g, (match) => {
    return replacements[match] || match; // Use replacement if exists, otherwise keep the original match
  });

  return formattedDate;
}

function formatDateTimeAgo(dateTimeStr) {
  const dateTime = new Date(dateTimeStr);
  const currentDate = new Date();

  // Calculate the difference in milliseconds between the current date and the provided date
  const diffMs = currentDate - dateTime;

  // Convert milliseconds to days
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  // Determine the format based on the difference in days
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else {
    return formatDateAdv(dateTimeStr, "d F, Y");
  }
}

module.exports = {
  getDifferenceOfTwoDatesInTime,
  padTo2Digits,
  formatDate,
  formatDateAdv,
  formatDateTimeAgo,
  calculateExpirationDate
};