import { useState } from "react";

const Task = ({ onAddTask, onDeleteTask, selectedProject }) => {
  if (!selectedProject) return;
  const [taskDesc, setTaskDesc] = useState("");

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
            {task.task}{" "}
            <button
              onClick={() => onDeleteTask(task.id)}
              className="ml-4 text-red-700"
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Task;
