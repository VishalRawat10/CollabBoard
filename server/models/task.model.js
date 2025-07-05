const { Schema, model } = require("mongoose");
const Board = require("./board.model");

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["To Do", "In Progress", "Done"],
        default: "To do",
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low",
        required: true
    },
    assignedTo: String,
    dueDate: {
        type: Date,
        required: true,
    },
    boardId: {
        type: Schema.Types.ObjectId,
        ref: "Board"
    }
}, { timestamps: true });

module.exports = model("Task", taskSchema);