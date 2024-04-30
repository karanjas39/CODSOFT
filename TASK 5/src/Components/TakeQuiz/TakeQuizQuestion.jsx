import { useState } from "react";

function TakeQuizQuestion({ ques, setMcq }) {
  const { question, options, _id, i } = ques;
  const [selOption, setSelOption] = useState(null);

  function handleOptionSelect(option) {
    setSelOption(option);
    setMcq((mcq) =>
      mcq.map((ques) => {
        if (ques._id == _id)
          return {
            ...ques,
            solution: option,
          };
        return ques;
      })
    );
  }

  return (
    <div className="ques">
      <p>
        Q{i + 1}. {question}
      </p>
      <div className="options">
        {/* <p className="selected">18 years</p> */}
        {options.map((opt, i) => (
          <p
            onClick={() => handleOptionSelect(i)}
            className={selOption == i ? "selected" : ""}
            key={i}
          >
            {opt}
          </p>
        ))}
      </div>
    </div>
  );
}

export default TakeQuizQuestion;
