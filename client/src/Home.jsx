import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Board from "./Board";
import EditTask from "./EditTask";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [currBoardTasks, setCurrBoardTasks] = useState();
  const [selectedIdx, setSelectedIdx] = useState();

  useEffect(() => {
    const getBoards = async () => {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/boards`);
      const jsonRes = await res.json();
      console.log(jsonRes);
      if (jsonRes.boards) setBoards(jsonRes.boards);
      setSelectedIdx(0);
    };
    getBoards();
  }, []);

  useEffect(() => {
    const getTask = async () => {
      if (!boards.length) {
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/boards/${
          boards[selectedIdx]._id
        }/tasks`
      );
      const jsonRes = await res.json();
      console.log(jsonRes);
      setCurrBoardTasks(jsonRes.tasks);
    };
    getTask();
  }, [selectedIdx]);

  //Add Board
  const onAddBoard = async (boardName) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/boards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: boardName }),
      });
      const jsonRes = await res.json();
      setBoards([...boards, jsonRes.board]);
    } catch (err) {
      console.log(err);
      alert(err.message || "Couldn't add board!");
    }
  };

  return (
    <div className="bg-[#e9ecef] h-screen flex relative">
      <SideBar
        boards={boards}
        setSelectedIdx={setSelectedIdx}
        selectedIdx={selectedIdx}
        onAddBoard={onAddBoard}
      />
      <div className="flex items-center justify-center w-3/4">
        <Board
          board={boards[selectedIdx]}
          tasks={currBoardTasks}
          setTasks={setCurrBoardTasks}
        />
      </div>
    </div>
  );
}
