import { useLoaderData } from "react-router-dom";
import RecentBlogs from "../Blog/RecentBlogs";

export function formatDate(dateData) {
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

function Details() {
  const data = useLoaderData();

  return (
    <section className="dashboard">
      <div className="details">
        <p>
          Hi! <span>{data?.username}</span>
        </p>
        <div>
          <h2>Personal Details</h2>
          <p>
            Name <span>{data?.name}</span>
          </p>
          <p>
            Email <span>{data?.email}</span>
          </p>
          <p>
            Joined Us <span>{formatDate(data?.createdAt)}</span>
          </p>
          <p>
            Verified
            <span className={data?.verified == true ? "v" : "nv"}>
              {data?.verified == true ? "Verified" : "Not Verified"}
            </span>
          </p>
        </div>
      </div>
      <RecentBlogs />
    </section>
  );
}

export default Details;

export const getDetails = async ({ params }) => {
  const token = sessionStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:8080/v1/api/user/details", {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();

  return data?.user || null;
};
