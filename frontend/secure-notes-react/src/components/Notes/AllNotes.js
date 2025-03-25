import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import NoteItems from "./NoteItems";
import { FiFilePlus } from "react-icons/fi";
import { Blocks } from "react-loader-spinner";
import Errors from "../Errors";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/notes");

      const parsedNotes = response.data.map((note) => ({
        ...note,
        parsedContent: JSON.parse(note.content).content, // Assuming each note's content is JSON-formatted.
      }));
      setNotes(parsedNotes);
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //calling the function here to fetch all notes
    fetchNotes();
  }, []);

  //to show an errors
  if (error) {
    return <Errors message={error} />;
  }

  return (
    <div className="min-h-[calc(100vh-74px)] sm:py-10 sm:px-5 px-0 py-4">
      <div className="w-[92%] mx-auto ">
        {!loading && notes && notes?.length > 0 && (
          <h1 className="font-montserrat  text-slate-800 sm:text-4xl text-2xl font-semibold ">
            My Notes
          </h1>
        )}
        {loading ? (
          <div className="flex  flex-col justify-center items-center  h-72">
            <span>
              <Blocks
                height="70"
                width="70"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
              />
            </span>
            <span>Please wait...</span>
          </div>
        ) : (
          <>
            {notes && notes?.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-96  p-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    You didn't create any note yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Start by creating a new note to keep track of your thoughts.
                  </p>
                  <div className="w-full flex justify-center">
                    <Link to="/create-note">
                      <button className="flex items-center px-4 py-2 bg-btnColor text-white rounded  focus:outline-none focus:ring-2 focus:ring-blue-300">
                        <FiFilePlus className="mr-2" size={24} />
                        Create New Note
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="pt-10 grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-10 gap-x-5 justify-center">
                  {notes.map((item) => (
                    <NoteItems key={item.id} {...item} id={item.id} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AllNotes;
