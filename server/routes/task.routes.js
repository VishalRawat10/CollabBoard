const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.route("/:taskId").put(taskController.editTask).delete(taskController.destroyTask);

module.exports = router;