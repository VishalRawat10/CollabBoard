import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import Board from "./Board";

export default function Home() {
  const [boards, setBoards] = useState([]);
  const [currBoardTasks, setCurrBoardTasks] = useState();
  const [selectedIdx, setSelectedIdx] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBoards = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/boards`);
        const jsonRes = await res.json();
        console.log(jsonRes);
        if (jsonRes.boards) setBoards(jsonRes.boards);
        setSelectedIdx(0);
      } catch (err) {
        console.log(err);
        alert("Internal server error! Unable to fetch boards data.");
      }
      setIsLoading(false);
    };
    getBoards();
  }, []);

  useEffect(() => {
    const getTask = async () => {
      setIsLoading(true);
      try {
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
      } catch (err) {
        console.log(err);
        alert("Internal server error! Unable to fetch task data.");
      }
      setIsLoading(false);
    };
    getTask();
  }, [selectedIdx]);

  //Add Board
  const onAddBoard = async (boardName) => {
    setIsLoading(true);
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
      alert("Board Added!");
    } catch (err) {
      console.log(err);
      alert(err.message || "Couldn't add board!");
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-[#e9ecef] h-screen flex relative">
      {isLoading ? (
        <div className="absolute top-0 w-screen h-screen flex bg-black/30 z-50 justify-center pt-30">
          Loading...
        </div>
      ) : (
        <></>
      )}
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
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}
