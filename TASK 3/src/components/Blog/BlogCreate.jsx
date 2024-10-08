import "../../Styles/create-blog.scss";
import { Form, redirect, useActionData } from "react-router-dom";

function BlogCreate() {
  const data = useActionData();

  return (
    <div className="create-blog">
      <h2>Create Post</h2>
      <Form action="/dashboard/blog/create" method="post">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter blog title here.."
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            placeholder="Enter blog description here.."
          ></textarea>
        </div>
        <button>Create Blog</button>
        {data && data.message && <p>{data.message}</p>}
      </Form>
    </div>
  );
}

export default BlogCreate;

export async function handleCreateBlog({ request }) {
  const req = await request.formData();

  const submission = {
    title: req.get("title").trim(),
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
    const response = await fetch("http://127.0.0.1:8081/v1/api/blog/create", {
      method: "POST",
      body: JSON.stringify(submission),
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success == true) {
      return redirect("/dashboard/user");
    }
    return { message: data.message };
  } catch (error) {
    return { message: "Unable to create blog now. Try again later." };
  }
}
