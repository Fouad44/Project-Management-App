import { useState, useRef, useEffect } from "react";

import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import CreateProject from "./components/CreateProject";
import Project from "./components/Project";
import BurgerMenu from "./components/BurgerMenu";

function App() {
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  const burgerMenuRef = useRef();

  const [pageMode, setPageMode] = useState("empty");
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const handleIsCreating = () => {
    setPageMode("create");
    setSelectedProjectId(null);
  };

  const handleCancelCreate = () => {
    setPageMode("empty");
  };

  const handleSaveProject = () => {
    if (
      !titleRef.current.value ||
      !descRef.current.value ||
      !dateRef.current.value
    )
      return;
    const newProject = {
      id: Date.now(),
      title: titleRef.current.value,
      desc: descRef.current.value,
      date: dateRef.current.value,
      tasks: [],
    };
    setProjects((prevProjects) => [newProject, ...prevProjects]);
    setSelectedProjectId(newProject.id);

    setPageMode("project");
  };

  const handleProjectCreated = () => {
    setPageMode("project");
  };

  const handleSelectId = (id) => {
    setSelectedProjectId(id);
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setPageMode("empty");
  };

  const handleAddTask = (taskDesc) => {
    if (!taskDesc.trim()) return;
    const newTask = {
      id: Date.now(),
      task: taskDesc,
    };
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === selectedProjectId ? { ...p, tasks: [newTask, ...p.tasks] } : p,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project,
      ),
    );
  };

  const handleToggleMenu = () => {
    if (window.innerWidth < 768) {
      setIsMenuOpen((prev) => !prev);
    }
  };

  const handleCloseMenu = () => {
    if (window.innerWidth < 768) {
      burgerMenuRef.current.click();
    }
  };

  return (
    <main className="flex min-h-screen bg-stone-50 max-xl:text-base">
      {isMenuOpen && window.innerWidth < 768 && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-60"
          onClick={handleCloseMenu}
        ></div>
      )}
      <BurgerMenu
        onToggleMenu={handleToggleMenu}
        ref={burgerMenuRef}
        isMenuOpen={isMenuOpen}
      />
      <SideBar
        onProjectCreated={handleProjectCreated}
        onSelectProject={handleSelectId}
        onCreateProject={handleIsCreating}
        selectedProjectId={selectedProjectId}
        projects={projects}
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      />
      {pageMode === "empty" && (
        <NoProjectSelected onCreateProject={handleIsCreating} />
      )}
      {pageMode === "create" && (
        <CreateProject
          onCancelCreate={handleCancelCreate}
          onSaveProject={handleSaveProject}
          titleRef={titleRef}
          descRef={descRef}
          dateRef={dateRef}
        />
      )}
      {pageMode === "project" && (
        <Project
          projects={projects}
          selectedProjectId={selectedProjectId}
          onDelete={handleDeleteProject}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </main>
  );
}

export default App;
