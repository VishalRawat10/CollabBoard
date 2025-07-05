const express = require("express");
const router = express.Router();
const boardController = require("../controllers/board.controller");

router.route("/").get(boardController.getBoards).post(boardController.createBoard);
router.route("/:boardId/tasks").get(boardController.getTasks).post(boardController.createTask);

module.exports = router;