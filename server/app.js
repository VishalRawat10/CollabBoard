require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { connectToDb } = require("./db/db");
const taskRouter = require("./routes/task.routes");
const boardRouter = require("./routes/board.routes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use("/boards", boardRouter);
app.use("/tasks", taskRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is listening to port", process.env.PORT);
    connectToDb().then((res) => console.log("mongoose is connected")).catch((err) => console.log(err));
});