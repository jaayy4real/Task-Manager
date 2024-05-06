const Task = require('../models/task.model.js');

const createTask = async (req, res) => {
    const { title, description, dueDate, priority, status  } = req.body;

    if(req.session && req.session.userId){
        try {
            const task = new Task({
                title,
                description,
                dueDate,
                priority,
                status,
                creator: req.session.userId
            })
            await task.save();
            res.send('Task created successfully');

        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating task');
        }
    } else {
        res.status(401).send('Unauthorized');
    }
}

module.exports = { createTask }