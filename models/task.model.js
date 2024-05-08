const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title is required'],
    },
    description:{type: String},
    dueDate:{type: Date},
    priority:{
        type: String,
        enum: ['Low', 'Medium', 'High'],
    },
    status:{
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    assignee:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId, ref:'User', required:true
    },
    creatorName:{
        type: String,
        required: [true, 'Creator name is required'],
    }

},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
