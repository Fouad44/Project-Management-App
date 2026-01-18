const CreateProject = ({
  onCancelCreate,
  onSaveProject,
  titleRef,
  descRef,
  dateRef,
}) => {
  return (
    <section className="section">
      <div className="flex justify-end gap-4 w-4/6">
        <button onClick={onCancelCreate}>Cancel</button>
        <button onClick={onSaveProject} className="black-button">
          Save
        </button>
      </div>
      <div className="input-container">
        <label htmlFor="title">TITLE</label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          placeholder="Enter project title"
          className="input"
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="desc">DESCRIPTION</label>
        <textarea
          ref={descRef}
          id="desc"
          className="input"
          placeholder="Enter project description"
          required
        />
      </div>
      <div className="input-container">
        <label htmlFor="date">DATE</label>
        <input ref={dateRef} type="date" id="date" className="input" required />
      </div>
    </section>
  );
};

export default CreateProject;
