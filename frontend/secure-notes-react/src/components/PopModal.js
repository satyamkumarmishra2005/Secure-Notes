import * as React from "react";
import { AiOutlineWarning } from "react-icons/ai";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Modals({ open, setOpen, noteId }) {
  const navigate = useNavigate();
  const [noteDeleteLoader, setNoteDeleteLoader] = React.useState(false);

  const onNoteDeleteHandler = async () => {
    try {
      setNoteDeleteLoader(true);

      await api.delete(`/notes/${noteId}`);
      toast.success("Note Delete successful");
      setOpen(false);
      navigate("/notes");
    } catch (err) {
      toast.error("Delete Note Failed");
    } finally {
      setNoteDeleteLoader(false);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex justify-center items-center h-full">
          <div className="w-96 bg-headerColor rounded-lg shadow-xl max-w-md  px-6 py-10 m-4">
            <div className="flex flex-col items-center justify-center">
              <AiOutlineWarning className="text-red-600 text-2xl" />
            </div>
            <p className="mt-4 text-white text-center">
              Are you sure you want to delete this note?
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={onNoteDeleteHandler}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                {noteDeleteLoader ? "Loading" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
