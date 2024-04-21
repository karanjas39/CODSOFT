import "../../Styles/popup.scss";

function PopUp({ setIsPopUp, setBlogs, toDeleteBlog }) {
  async function handleBlogDelete(res) {
    if (!res) {
      return setIsPopUp(false);
    }

    const token = sessionStorage.getItem("token");
    const response = await fetch("http://127.0.0.1:8080/v1/api/blog/delete", {
      method: "POST",
      body: JSON.stringify({ _id: toDeleteBlog }),
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success == true) {
      return setBlogs((blogs) =>
        blogs.filter((blog) => blog._id != toDeleteBlog)
      );
    }
    return setIsPopUp(false);
  }

  return (
    <div className="popup" onClick={() => setIsPopUp(false)}>
      <div>
        <h3>Do you want to delete this post?</h3>
        <div>
          <button onClick={() => handleBlogDelete(true)}>Yes</button>
          <button onClick={() => handleBlogDelete(false)}>No</button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
