const express = require('express');
const router = express.Router();
const { createTask, getTask } = require('../controllers/task.controller.js')

router.post('/create', createTask)
router.get("/", getTask)

module.exports = router;