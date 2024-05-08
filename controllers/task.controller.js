const Task = require('../models/task.model.js');
const User = require('../models/user.model.js');

const createTask = async (req, res) => {
    const { title, description, dueDate, priority, status  } = req.body;

    if(req.session && req.session.userId){
        try {
            const user = await User.findById(req.session.userId);
            const task = new Task({
                title,
                description,
                dueDate,
                priority,
                status,
                creator: user._id,
                creatorName: user.username
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

const getTask = async (req, res) => {
    if(req.session && req.session.userId){
        try {
            const task = await Task.find({})
            res.status(200).json(task)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }else{
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { createTask, getTask };