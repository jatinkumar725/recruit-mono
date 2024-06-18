import { SUPPORTED_MONTHS } from "../constants/siteConstants";

function createDate(year, month) {
  // Create a new Date object with year and month (months are zero-based in JavaScript)
  const date = new Date(year, month - 1, 1); // Subtracting 1 from month to make it zero-based

  // Get the year, month, and day from the Date object
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month and padding with 0 if necessary
  const dd = "01"; // Day is always 01

  // Return the date in the desired format YYYY-MM-01
  return `${yyyy}-${mm}-${dd}`;
}

function formatDate(dateString, format) {
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

function getDateComponents(dateString) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Adding 1 because months are zero-based
  const day = date.getDate();

  return { year, month, day };
}

function getTimeAgo(timestamp) {
  const seconds = Math.floor((1712485909 - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000);

  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }

  return "Today";
}

function formatTime(timeString, format) {
  const time = new Date(`1970-01-01T${timeString}`);
  
  const hh = String(time.getHours()).padStart(2, '0');
  const h = time.getHours();
  const mm = String(time.getMinutes()).padStart(2, '0');
  const m = time.getMinutes();
  const ss = String(time.getSeconds()).padStart(2, '0');
  const s = time.getSeconds();

  const replacements = {
      'H': hh,
      'G': h,
      'i': mm,
      'I': m,
      's': ss,
      'S': s
  };

  // Replace format placeholders with actual values
  let formattedTime = format;
  Object.keys(replacements).forEach(key => {
      formattedTime = formattedTime.replace(new RegExp(key, 'g'), replacements[key]);
  });

  return formattedTime;
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
    return 'today';
  } else if (diffDays === 1) {
    return 'yesterday';
  } else {
    return formatDate(dateTimeStr);
  }
}

export { createDate, formatDate, getDateComponents, getTimeAgo, formatTime, formatDateTimeAgo };
