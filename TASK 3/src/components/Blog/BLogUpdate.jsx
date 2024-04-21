import {
  useActionData,
  Form,
  useParams,
  useLoaderData,
  redirect,
} from "react-router-dom";
import "../../Styles/blog.scss";

export default function BLogUpdate() {
  const data = useActionData();
  const { bid } = useParams();
  const { blog } = useLoaderData();

  return (
    <section className="blog-update">
      <h2>Update Blog</h2>
      <Form action={`/dashboard/blog/update/${bid}`} method="post">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter updated title.."
            defaultValue={blog.title}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Enter updated description.."
            defaultValue={blog.description.replace(/<br>/g, "\n")}
          ></textarea>
        </div>
        <button>Update Blog</button>
        {data && data.message && <p>{data.message}</p>}
      </Form>
    </section>
  );
}

export async function blogUpdateInit({ request, params }) {
  const { bid } = params;
  const req = await request.formData();
  const submission = {
    _id: bid,
    title: req.get("title"),
    description: req.get("description").replace(/\n/g, "<br>"),
  };
  if (!submission.title || !submission.description) {
    return { message: "All fields are mandatory." };
  }

  const token = sessionStorage.getItem("token");
  if (!token) {
    return redirect("/login");
  }

  try {
    const response = await fetch(
      "https://codsoft-x5ou.onrender.com/v1/api/blog/update",
      {
        method: "POST",
        body: JSON.stringify(submission),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.success == true) {
      return redirect("/dashboard/user");
    }
    return { message: data.message };
  } catch (error) {
    return { message: "Unable to update blog now. Try again later." };
  }
}
