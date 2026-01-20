const SideBar = ({
  onCreateProject,
  projects,
  // onProjectCreated,
  onSelectProject,
  selectedProjectId,
  isMenuOpen,
  onCloseMenu,
}) => {
  return (
    <aside
      className={`flex mt-12 text-gray-50 bg-green-900 w-1/6 max-xl:w-2/6 max-md:w-4/6 rounded-tr-md pr-8 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 max-md:fixed max-md:h-screen transition-all duration-300`}
    >
      <nav className="flex flex-col ml-6 mt-4 w-full">
        <h2 className="my-8 text-fluid font-bold max-2xl:text-lg">
          YOUR PROJECTS
        </h2>
        <button
          onClick={() => {
            onCreateProject();
            onCloseMenu();
          }}
          className="mb-8 bg-green-600 hover:bg-green-700 shadow-lg ring-1 ring-white/10 hover:ring-white/20 transition-all duration-200 px-4 py-2 rounded-md"
        >
          + Add Project
        </button>
        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              onClick={() => {
                // onProjectCreated();
                onSelectProject(project.id);
                onCloseMenu();
              }}
            >
              <button
                className={`li-btn ${
                  selectedProjectId === project.id
                    ? "bg-green-700 text-white"
                    : "hover:bg-green-800 transition-all duration-200 text-green-50"
                }`}
              >
                {project.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
