export default function formatDate(dateData) {
  try {
    const dateString = dateData;
    const date = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate - date;
    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;

    if (timeDifference < oneMinute) {
      return "Just now";
    } else if (timeDifference < oneHour) {
      const minutesAgo = Math.floor(timeDifference / oneMinute);
      return `${minutesAgo} mins ago`;
    } else if (timeDifference < oneDay) {
      const hoursAgo = Math.floor(timeDifference / oneHour);
      return `${hoursAgo} hours ago`;
    } else if (timeDifference < oneWeek) {
      const daysAgo = Math.floor(timeDifference / oneDay);
      return `${daysAgo} days ago`;
    } else {
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      return formattedDate;
    }
  } catch (error) {
    console.log(`Error: ${error.toString()} in formatDate2`);
    return "Invalid Date";
  }
}
