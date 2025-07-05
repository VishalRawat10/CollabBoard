import React, { useState } from "react";

export default function EditTask({ task, onUpdate }) {
  const [taskDetails, setTaskDetails] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(taskDetails);
  };

  const handleInputChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="col-span-5 bg-[#E9ECEF] rounded-lg text-black px-8 py-4 text-sm flex flex-col gap-2"
      onSubmit={handleSubmit}
    >
      <h4 className="font-semibold text-xl">Edit Task</h4>
      <div className="grid grid-cols-3 ">
        <label htmlFor="title" className="font-semibold col-span-1">
          Title*:
        </label>
        <input
          type="text"
          className="border-black border-1 focus:outline-none px-4 py-1 rounded-lg col-span-2"
          id="title"
          value={taskDetails.title}
          name="title"
          onChange={handleInputChange}
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
          value={taskDetails.description}
          name="description"
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
          value={
            taskDetails.dueDate
              ? new Date(taskDetails.dueDate).toISOString().split("T")[0]
              : ""
          }
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
          value={taskDetails.assignedTo}
          name="assignedTo"
          placeholder="Enter the person name.."
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="status" className="font-semibold">
          Status*
        </label>
        <select name="status" id="status" onChange={handleInputChange}>
          <option value={"To Do"} selected={taskDetails.status === "To Do"}>
            To Do
          </option>
          <option
            value={"In Progress"}
            selected={taskDetails.status === "In Progress"}
          >
            In Progress
          </option>
          <option value={"Done"} selected={taskDetails.status === "Done"}>
            Done
          </option>
        </select>
      </div>
      <div className="grid grid-cols-3 ">
        <label htmlFor="priority" className="font-semibold">
          Priority
        </label>
        <select name="priority" id="priority" onChange={handleInputChange}>
          <option value={"Low"} selected={taskDetails.priority === "Low"}>
            Low
          </option>
          <option value={"Medium"} selected={taskDetails.priority === "Medium"}>
            Medium
          </option>
          <option value={"High"} selected={taskDetails.priority === "High"}>
            High
          </option>
        </select>
      </div>
      <button
        type="submit"
        className="w-fit px-4 py-2 rounded-lg bg-green-500 text-white cursor-pointer "
      >
        Update Task
      </button>
    </form>
  );
}
