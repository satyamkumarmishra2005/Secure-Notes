import { MdDateRange } from "react-icons/md";
import { auditLogsTruncateTexts } from "./truncateText";

export const auditLogscolumn = [
  {
    field: "actions",
    headerName: "Action",
    width: 160,
    headerAlign: "center",
    align: "center",
    editable: false,

    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal  border",
    renderHeader: (params) => <span className="ps-10">Action</span>,
  },

  {
    field: "username",
    headerName: "UserName",
    width: 200,
    editable: false,
    headerAlign: "center",
    disableColumnMenu: true,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal  border",
    renderHeader: (params) => <span className="ps-10">UserName</span>,
  },

  {
    field: "timestamp",
    headerName: "TimeStamp",
    width: 220,
    editable: false,
    headerAlign: "center",
    disableColumnMenu: true,
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal  border",
    renderHeader: (params) => <span className="ps-10">TimeStamp</span>,
    renderCell: (params) => {
      return (
        <div className=" flex  items-center justify-center  gap-1 ">
          <span>
            <MdDateRange className="text-slate-700 text-lg" />
          </span>
          <span>{params?.row?.timestamp}</span>
        </div>
      );
    },
  },
  {
    field: "noteid",
    headerName: "NoteId",
    disableColumnMenu: true,
    width: 150,
    editable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold border",
    cellClassName: "text-slate-700 font-normal  border",
    renderHeader: (params) => <span>NoteId</span>,
  },
  {
    field: "note",
    headerName: "Note Content",
    width: 350,
    disableColumnMenu: true,
    editable: false,
    headerAlign: "center",
    align: "center",
    headerClassName: "text-black font-semibold ",
    cellClassName: "text-slate-700 font-normal  ",
    renderHeader: (params) => <span className="ps-10">Note Content</span>,
    renderCell: (params) => {
      const contens = JSON.parse(params?.value)?.content;

      const response = auditLogsTruncateTexts(contens, 50);

      return <p className=" text-slate-700 text-center   ">{response}</p>;
    },
  },
];
