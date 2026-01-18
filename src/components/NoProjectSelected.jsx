import projectIcon from "../images/no-projects.png";

const NoProjectSelected = ({ onCreateProject }) => {
  return (
    <section className="section">
      <img src={projectIcon} alt="project" className="w-24 max-md:w-16" />
      <h1 className="my-8 text-center text-3xl max-md:text-xl font-extrabold">
        No Project Selected
      </h1>
      <p className="text-gray-500 font-semibold mb-12 max-md:font-medium max-md:text-sm">
        Select project or get started with a new one.
      </p>
      <button onClick={onCreateProject} className="black-button">
        Create new project
      </button>
    </section>
  );
};

export default NoProjectSelected;
