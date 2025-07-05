const Task = require("../models/task.model");

// edit task
module.exports.editTask = async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        return res.status(400).json({ message: "Taskid id required." });
    }
    const { title, description, assignedTo, dueDate, priority, status } = req.body;

    if (!title || !description || !dueDate || !status) {
        return res.status(400).json({ message: "Incomplete task information." });
    }
    try {
        const task = await Task.findByIdAndUpdate(taskId, { title, description, assignedTo, status, priority, dueDate });
        return res.status(200).json({ message: "task updated successfully", task });

    } catch (err) {
        return res.status(500).json({ message: "Internal server error!", error: err })
    }
}


//Destroy tasks
module.exports.destroyTask = async (req, res) => {
    const { taskId } = req.params;
    if (!taskId) {
        return res.status(400).json({ message: "Taskid id required." });
    }
    try {
        const task = await Task.findByIdAndDelete(taskId);
        console.log(task);
        return res.status(200).json({ message: "task deleted successfully", task });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error!", error: err })
    }
}