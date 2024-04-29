function McqListedInList({ ques, i, setMcq }) {
  function handleRemoveQuestion() {
    setMcq((mcq) => mcq.filter((qus) => qus.id !== ques.id));
  }

  return (
    <div>
      <h3>
        Q{i}. {ques.question}
      </h3>
      <div>
        {ques.options.map((option, i) => (
          <p className={i == ques.answer ? "correct" : ""}>
            {i + 1}. {option}
          </p>
        ))}
      </div>
      <button onClick={handleRemoveQuestion}>Delete</button>
    </div>
  );
}

export default McqListedInList;
