const express = require('express');
const mongoose = require('mongoose');
const app = express();



mongoose.connect("mongodb+srv://ekpojeffrey:mary4jeffrey@taskmanager.vgvdnsz.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=TaskManager")
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    })
})
.catch(err => console.log(err))