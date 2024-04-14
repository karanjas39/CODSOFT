import { MdEdit, MdDelete } from "react-icons/md";

import "./Task.css";
import { useState } from "react";

function Task({ task, id, setTasks }) {
  const [done, setDone] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleRemoveTask() {
    setTasks((list) => list.filter((obj) => obj.id != id));
  }

  return (
    <>
      {edit && (
        <EditTask task={task} id={id} setTasks={setTasks} setEdit={setEdit} />
      )}
      <div className={`task-template ${done ? "task-temp-done" : ""}`}>
        <button
          className={done ? "notdonebtn" : "donebtn"}
          onClick={() => setDone((prev) => !prev)}
        >
          {done ? "Undone" : "Done"}
        </button>
        <p className={done ? "taskdone" : "tasknotdone"}>{task}</p>
        <div>
          <p onClick={() => setEdit(true)}>{!done && <MdEdit />}</p>
          <p onClick={handleRemoveTask}>
            <MdDelete />
          </p>
        </div>
      </div>
    </>
  );
}

function EditTask({ task, id, setTasks, setEdit }) {
  const [editedTask, setEditedTask] = useState(task);

  function handleEditTask(e) {
    e.preventDefault();
    setTasks((tasks) =>
      tasks.map((task) => {
        if (task.id == id) return { id: task.id, task: editedTask };
        return task;
      })
    );

    setEdit(false);
  }
  return (
    <>
      <div className="blur"></div>
      <form className="update-task" onSubmit={handleEditTask}>
        <input
          type="text"
          placeholder="Enter updated task..."
          value={editedTask}
          onChange={(e) => setEditedTask(e.target.value)}
        />
        <button>Update</button>
      </form>
    </>
  );
}

export default Task;
