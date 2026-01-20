import { useState, useRef, useEffect } from "react";

import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/SideBar";
import CreateProject from "./components/CreateProject";
import Project from "./components/Project";
import BurgerMenu from "./components/BurgerMenu";
import ModalWarning from "./components/Modal";

function App() {
  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  const burgerMenuRef = useRef();

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem("projects");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Changing State on window resize
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

  // Render stored projects in localStorage
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Getting the selected project
  const selectedProject =
    typeof selectedProjectId === "number"
      ? projects.find((project) => project.id === selectedProjectId)
      : null;

  const handleIsCreating = () => {
    setSelectedProjectId("create");
  };

  const handleCancelCreate = () => {
    setSelectedProjectId(null);
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
  };

  const handleSelectId = (id) => {
    setSelectedProjectId(id);
  };

  const handleDeleteProject = (id) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setSelectedProjectId(null);
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

  const handleSaveEditedTask = (taskId, taskValue) => {
    if (!selectedProjectId) return;
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === selectedProjectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, task: taskValue } : task,
              ),
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  let content;

  if (selectedProjectId === "create") {
    content = (
      <CreateProject
        onCancelCreate={handleCancelCreate}
        onSaveProject={handleSaveProject}
        titleRef={titleRef}
        descRef={descRef}
        dateRef={dateRef}
      />
    );
  } else if (selectedProjectId) {
    content = (
      <Project
        projects={projects}
        selectedProjectId={selectedProjectId}
        selectedProject={selectedProject}
        onDelete={handleOpenModal}
        onAddTask={handleAddTask}
        onDeleteTask={handleDeleteTask}
        onSaveTask={handleSaveEditedTask}
      />
    );
  } else {
    content = <NoProjectSelected onCreateProject={handleIsCreating} />;
  }

  return (
    <main className="flex min-h-screen bg-stone-50 max-xl:text-base">
      {isMenuOpen && window.innerWidth < 768 && (
        <div
          className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-60"
          onClick={handleCloseMenu}
        ></div>
      )}
      {isModalOpen && (
        <ModalWarning
          onClose={handleCloseModal}
          onDelete={handleDeleteProject}
          project={selectedProject}
        />
      )}
      <BurgerMenu
        onToggleMenu={handleToggleMenu}
        ref={burgerMenuRef}
        isMenuOpen={isMenuOpen}
      />
      <SideBar
        onSelectProject={handleSelectId}
        onCreateProject={handleIsCreating}
        selectedProjectId={selectedProjectId}
        projects={projects}
        isMenuOpen={isMenuOpen}
        onCloseMenu={handleCloseMenu}
      />
      {content}
    </main>
  );
}

export default App;
