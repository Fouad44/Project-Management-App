import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ModalWarning = ({ project, onClose, onDelete }) => {
  const dialogRef = useRef();

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);
  return createPortal(
    <dialog
      ref={dialogRef}
      className="max-w-2xl max-md:w-5/6 p-6 rounded-xl shadow-xl border border-red-300 bg-white text-center max-sm:text-xs"
    >
      <h2 className="text-2xl font-bold text-red-600 mb-4">Warning</h2>
      <p className="text-gray-700 mb-2">
        Are you sure you want to delete this project ({project.title})?
      </p>
      <p className="text-gray-800 text-sm max-sm:text-xs mb-6">
        If you delete this project you will lose all <strong>Tasks</strong>{" "}
        inserted in this project aswell.
      </p>
      <div className="flex justify-end gap-4">
        <form method="dialog">
          <button
            onClick={() => {
              onClose();
            }}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </form>
        <button
          onClick={() => {
            onClose();
            onDelete(project.id);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </dialog>,
    document.getElementById("modal-root"),
  );
};

export default ModalWarning;
