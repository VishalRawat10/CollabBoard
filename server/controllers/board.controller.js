const Board = require("../models/board.model");
const Task = require("../models/task.model");

//Get all boards
module.exports.getBoards = async (req, res, next) => {
    try {
        const boards = await Board.find();
        return res.status(200).json({ boards, message: "Boards fetched successfully." });
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err })
    }
}


//Create board
module.exports.createBoard = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Please fill all the fields!" });
    }
    try {
        const board = new Board({
            name
        });
        await board.save();
        return res.status(201).json({ message: "Board created successfully!", board });
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err });
    }
}

//Get Tasks
module.exports.getTasks = async (req, res) => {
    const { boardId } = req.params;
    if (!boardId) return res.status(400).json({ message: "BoardId not given." });
    try {
        const tasks = await Task.find({ boardId });
        return res.status(200).json({ tasks, message: "Tasks fetched successfully!" });
    } catch (err) {
        return res.status(500).json({ message: err.message, error: err });
    }
}

//Create task
module.exports.createTask = async (req, res) => {
    const { boardId } = req.params;
    if (!boardId) return res.status(400).json({ message: "BoardId not given." });
    console.log(req.body);
    const { title, description, assignedTo, dueDate, priority, status } = req.body;
    if (!title || !description || !dueDate) {
        return res.status(400).json({ message: "Incomplete task data!" });
    }
    try {
        const task = new Task({
            title,
            description,
            assignedTo,
            dueDate,
            priority,
            status,
            boardId,
        });
        await task.save();
        return res.status(201).json({ message: "Task created successfully!", task });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server error!", error: err });
    }
}