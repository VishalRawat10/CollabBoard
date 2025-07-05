import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function SideBar({
  boards,
  selectedIdx,
  setSelectedIdx,
  onAddBoard,
}) {
  const [addBoard, setAddBoard] = useState(false);
  const [boardName, setBoardName] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddBoard(boardName);
    setBoardName("");
  };
  return (
    <div className="h-screen w-1/4 bg-white shadow-2xl overflow-y-auto overflow-x-hidden scrollbar-thin">
      <div className=" text-3xl w-full flex justify-center py-8">
        <Link to={"/"}>Logo</Link>
      </div>

      <div className="flex justify-between items-center h-10 px-8 bg-[#8338ec] text-white mb-2">
        <p className="text-xl font-semibold ">Boards</p>
        <button onClick={() => setAddBoard(!addBoard)}>
          <AddIcon
            className="cursor-pointer hover:scale-130"
            style={{ transition: "scale 0.2s linear" }}
          />
        </button>
      </div>
      {addBoard && (
        <form className="px-4 my-4" onSubmit={handleFormSubmit}>
          <div className="border-2 border-[#8338ec] rounded-lg  flex justify-between">
            <input
              type="text"
              placeholder="Enter board name"
              className="px-3 py-2 w-full focus:outline-none"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
            />
            <button className="bg-[#8338ec] text-white px-4 py-2 cursor-pointer hover:opacity-85">
              ADD
            </button>
          </div>
        </form>
      )}
      <div className="">
        {boards?.map((board, idx) => {
          return (
            <button
              className={
                "h-[calc(100%-10rem)] overflow-auto cursor-pointer w-full text-left px-6 py-4  text-lg font-semibold " +
                (selectedIdx === idx
                  ? "scale-x-105 scale-y-110"
                  : "hover:bg-black/10")
              }
              key={idx}
              onClick={() => setSelectedIdx(idx)}
            >
              {idx + 1 + ")"} {board.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
