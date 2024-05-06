const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/task.controller.js')

router.post('/create', createTask)

module.exports = router;