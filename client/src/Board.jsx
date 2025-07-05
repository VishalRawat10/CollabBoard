import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import EditTask from "./EditTask";
import AddTask from "./AddTask";

export default function Board({ board, tasks, setTasks }) {
  const [filter, setFilter] = useState("All");
  const [editTask, setEditTask] = useState();
  const [addTask, setAddTask] = useState(false);

  // Add Task
  const onAddTask = async (task) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/boards/${board._id}/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(task),
        }
      );

      const jsonRes = await res.json();
      console.log(jsonRes);
      setTasks([...tasks, jsonRes.task]);
      alert("Task Added!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add task.");
    }
  };

  // Update Task
  const onTaskUpdate = async (taskDetails) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tasks/${taskDetails._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskDetails),
        }
      );
      const jsonRes = await res.json();
      console.log(jsonRes);
      const updatedTasks = tasks.map((task) => {
        return jsonRes.task._id === task._id ? jsonRes.task : task;
      });
      console.log(updatedTasks);
      setTasks(updatedTasks);
      alert("Task Updated!");
    } catch (err) {
      console.log(err);
      alert(err.message || "Unable to update!");
    }
  };

  // Delete TAsk
  const deleteTask = async (task) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tasks/${task._id}`,
        {
          method: "DELETE",
        }
      );
      const jsonRes = await res.json();
      console.log(jsonRes);
      const updatedTasks = tasks.filter((task) => {
        return jsonRes.task._id !== task._id;
      });
      setTasks(updatedTasks);
      alert("Task deleted!");
    } catch (err) {
      console.log(err);
      alert(err.message || "Unable to delete!");
    }
  };

  return (
    // Board Container
    <div className="bg-white shadow-2xl rounded-xl w-1/2 px-4 py-4 max-h-[80vh] overflow-auto scrollbar-none">
      <h1 className="text-2xl text-center font-semibold">{board?.name}</h1>

      {/* Tasks container  */}
      <div className="flex flex-col gap-2 ">
        <span className="flex items-center justify-between px-3 py-1 bg-violet-700 text-white rounded-full">
          Tasks{" "}
          <AddIcon
            className="cursor-pointer"
            onClick={() => setAddTask(!addTask)}
          />
        </span>
        {addTask ? <AddTask onAddTask={onAddTask} /> : <></>}

        {/* Task Filter  */}
        <div className="px-6 text-[12px] flex gap-2">
          <span
            className={
              "border-1 border-violet-700 rounded-full px-3 py-1 cursor-pointer" +
              " " +
              (filter === "All" ? "bg-violet-700/20" : "hover:bg-violet-700/20")
            }
            onClick={() => setFilter("All")}
          >
            All
          </span>
          <span
            className={
              "border-1 border-violet-700 rounded-full px-3 py-1 cursor-pointer" +
              " " +
              (filter === "To Do"
                ? "bg-violet-700/20"
                : "hover:bg-violet-700/20")
            }
            onClick={() => setFilter("To Do")}
          >
            To Do
          </span>
          <span
            className={
              "border-1 border-violet-700 rounded-full px-3 py-1 cursor-pointer" +
              " " +
              (filter === "In Progress"
                ? "bg-violet-700/20"
                : "hover:bg-violet-700/20")
            }
            onClick={() => setFilter("In Progress")}
          >
            In Progress
          </span>
          <span
            className={
              "border-1 border-violet-700 rounded-full px-3 py-1 cursor-pointer" +
              " " +
              (filter === "Done"
                ? "bg-violet-700/20"
                : "hover:bg-violet-700/20")
            }
            onClick={() => setFilter("Done")}
          >
            Done
          </span>
        </div>

        {/* Tasks  */}
        <div className="h-[25rem] overflow-auto scrollbar-none relative">
          {tasks?.length ? (
            tasks?.map((task, idx) => {
              console.log(task);
              return filter === task.status || filter === "All" ? (
                <>
                  <div
                    className=" px-4 py-1 grid grid-cols-5 justify-between items-center "
                    key={idx}
                  >
                    <div className="col-span-4">
                      <p className="font-semibold">{task.title}</p>
                      <p className="text-sm">{task.description}</p>
                      <p className="text-sm italic opacity-80">
                        createdAt :{" "}
                        {new Date(task.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="col-span-1 flex justify-end gap-4 text-sm">
                      <EditIcon
                        sx={{ fontSize: "1.2rem" }}
                        className="cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => {
                          editTask === idx ? setEditTask() : setEditTask(idx);
                        }}
                      />

                      <DeleteIcon
                        sx={{ fontSize: "1.2rem" }}
                        className="cursor-pointer opacity-70 hover:opacity-100"
                        onClick={() => deleteTask(task)}
                      />
                    </div>
                    {editTask === idx ? (
                      <EditTask task={task} onUpdate={onTaskUpdate} />
                    ) : (
                      <></>
                    )}
                  </div>
                  <hr />
                </>
              ) : (
                <></>
              );
            })
          ) : (
            <div className="text-3xl opacity-60 absolute top-[30%] left-[28%]">
              NO TASK ADDED!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
