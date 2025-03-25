import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { DataGrid } from "@mui/x-data-grid";
import { Blocks } from "react-loader-spinner";
import Errors from "../Errors.js";
import moment from "moment";

//importing the the columns from the auditlogs
import { auditLogscolumn } from "../../utils/tableColumn.js";

const AuditLogsDetails = () => {
  //access the notid
  const { noteId } = useParams();
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSingleAuditLogs = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/audit/note/${noteId}`);

      setAuditLogs(data);
    } catch (err) {
      setError(err?.response?.data?.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [noteId]);

  useEffect(() => {
    if (noteId) {
      fetchSingleAuditLogs();
    }
  }, [noteId, fetchSingleAuditLogs]);

  const rows = auditLogs.map((item) => {
    const formattedDate = moment(item.timestamp).format(
      "MMMM DD, YYYY, hh:mm A"
    );

    //set the data for each rows in the table according to the field name in columns
    //Example: username is the keyword in row it should matche with the field name in column so that the data will show on that column dynamically

    return {
      id: item.id,
      noteId: item.noteId,
      actions: item.action,
      username: item.username,
      timestamp: formattedDate,
      noteid: item.noteId,
      note: item.noteContent,
    };
  });

  if (error) {
    return <Errors message={error} />;
  }

  return (
    <div className="p-4">
      <div className="py-6">
        {auditLogs.length > 0 && (
          <h1 className="text-center sm:text-2xl text-lg font-bold text-slate-800 ">
            Audit Log for Note ID - {noteId}
          </h1>
        )}
      </div>
      {loading ? (
        <>
          {" "}
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
        </>
      ) : (
        <>
          {auditLogs.length === 0 ? (
            <Errors message="Invalid NoteId" />
          ) : (
            <>
              {" "}
              <div className="overflow-x-auto w-full">
                <DataGrid
                  className="w-fit mx-auto px-0"
                  rows={rows}
                  columns={auditLogscolumn}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 6,
                      },
                    },
                  }}
                  disableRowSelectionOnClick
                  pageSizeOptions={[6]}
                  disableColumnResize
                />
              </div>
            </>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default AuditLogsDetails;
