import Task from "./Task";

const Project = ({
  selectedProjectId,
  onDelete,
  onAddTask,
  onDeleteTask,
  selectedProject,
  onSaveTask,
}) => {
  if (!selectedProjectId) return;

  const rawDate = selectedProject.date;
  const date = new Date(rawDate);
  const formatted = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="section max-lg:text-sm">
      <div className="flex justify-between w-5/6">
        <h2 className="h2">{selectedProject.title}</h2>
        <button
          onClick={() => onDelete(selectedProject.id)}
          className="font-semibold text-red-700"
        >
          Delete
        </button>
      </div>
      <div className="w-5/6 mb-8 mt-2">
        <p className="mb-8 text-gray-500 font-semibold">{formatted}</p>
        <p className="font-semibold">{selectedProject.desc}</p>
      </div>
      <hr className="w-5/6 border-2 border-gray-400 mb-8" />
      <Task
        onAddTask={onAddTask}
        selectedProject={selectedProject}
        onDeleteTask={onDeleteTask}
        onSaveTask={onSaveTask}
      />
    </section>
  );
};

export default Project;
