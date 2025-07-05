const { model, Schema } = require("mongoose");

const boardSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = model("Board", boardSchema);