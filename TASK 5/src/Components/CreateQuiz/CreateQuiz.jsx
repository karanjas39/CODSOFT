import NavBar from "../NavBar/NavBar";

const links = [
  {
    text: "Home",
    to: "/dashboard/creator",
  },
];

const btns = [
  {
    text: "Logout",
    to: "/",
  },
];

function CreateQuiz() {
  return (
    <section className="create-quiz">
      <NavBar links={links} btns={btns} />
      <p>Create Quiz</p>
    </section>
  );
}

export default CreateQuiz;
