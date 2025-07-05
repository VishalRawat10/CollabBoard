import React, { useState } from "react";

export default function AddTask({ onAddTask }) {
  const [task, setTask] = useState({
    description: "",
    title: "",
    assignedTo: "",
    dueDate: "",
    status: "",
    priority: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask(task);
    setTask({
      description: "",
      title: "",
      assignedTo: "",
      dueDate: "",
      status: "To Do",
      priority: "Low",
    });
  };

  const handleInputChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="col-span-5 bg-[#E9ECEF] rounded-lg text-black px-8 py-4 text-sm flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <h4 className="font-semibold text-xl">Add Task</h4>
      <div className="grid grid-cols-3 ">
        <label htmlFor="title" className="font-semibold col-span-1">
          Title*:
        </label>
        <input
          type="text"
          className="border-black border-1 focus:outline-none px-4 py-1 rounded-lg col-span-2"
          id="title"
          value={task.title}
          name="title"
          onChange={handleInputChange}
          placeholder="Add task title..."
          required
        />
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="description" className="font-semibold col-span-1">
          Description*:
        </label>
        <textarea
          id="description"
          className="border-black border-1 focus:outline-none px-4 py-1 rounded-lg col-span-2"
          value={task.description}
          name="description"
          placeholder="Enter description..."
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="dueDate" className="col-span-1 font-semibold">
          Due Date*:
        </label>
        <input
          type="date"
          className="border-black border-1 focus:outline-none px-4 py-1 rounded-lg col-span-2"
          id="dueDate"
          value={task.dueDate}
          name="dueDate"
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="assignedTo" className="col-span-1 font-semibold">
          Assigned To:{" "}
        </label>
        <input
          type="text"
          className="border-black border-1 focus:outline-none px-4 py-1 rounded-lg col-span-2"
          id="assignedTo"
          value={task.assignedTo}
          name="assignedTo"
          placeholder="Enter the person name.."
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="status" className="font-semibold">
          Status*
        </label>
        <select
          name="status"
          id="status"
          value={task.status}
          onChange={handleInputChange}
        >
          <option value={"To Do"}>To Do</option>
          <option value={"In Progress"}>In Progress</option>
          <option value={"Done"}>Done</option>
        </select>
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="priority" className="font-semibold">
          Priority
        </label>
        <select
          name="priority"
          id="priority"
          value={task.priority}
          onChange={handleInputChange}
        >
          <option value={"Low"}>Low</option>
          <option value={"Medium"}>Medium</option>
          <option value={"High"}>High</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-fit px-4 py-2 rounded-lg bg-green-500 text-white cursor-pointer "
      >
        Add Task
      </button>
    </form>
  );
}
