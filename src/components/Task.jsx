import { useState } from "react";
import deleteIcon from "../images/bin.png";
import editIcon from "../images/edit.png";

const Task = ({ onAddTask, onDeleteTask, selectedProject, onSaveTask }) => {
  if (!selectedProject) return;
  const [taskDesc, setTaskDesc] = useState("");

  const [editedValue, setEditedValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id, taskTitle) => {
    setEditingId(id);
    setEditedValue(taskTitle);
  };

  return (
    <div className="flex flex-col justify-start w-5/6">
      <h2 className="h2">Tasks</h2>
      <div className="flex items-center gap-4 my-8">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          className="w-2/6 max-md:w-4/6 px-4 py-2  bg-gray-200 outline-none rounded-sm border-b-0 border-gray-400 focus:border-b-2"
        />
        <button
          onClick={() => {
            onAddTask(taskDesc);
            setTaskDesc("");
          }}
          className="font-semibold text-green-700"
        >
          Add Task
        </button>
      </div>
      <ul className="flex flex-col gap-4 font-semibold">
        {selectedProject.tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between py-4 px-6 bg-gray-200 rounded"
          >
            {editingId === task.id ? (
              <p className="flex justify-between w-full">
                <input
                  type="text"
                  className="w-3/6 px-2 py-1  bg-white outline-none rounded-md border-b-0 border-gray-400 focus:border-b-2 max-md:text-sm"
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                />
                <button
                  onClick={() => {
                    onSaveTask(task.id, editedValue);
                    setEditingId(null);
                    setEditedValue("");
                  }}
                >
                  Save
                </button>
              </p>
            ) : (
              <div className="flex justify-between w-full">
                <p>{task.task}</p>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(task.id, task.task)}>
                    {" "}
                    <img src={editIcon} alt="delete" className="w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="ml-4 text-red-700"
                  >
                    <img src={deleteIcon} alt="delete" className="w-6" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
