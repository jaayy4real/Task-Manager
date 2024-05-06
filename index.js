const express = require('express');
const mongoose = require('mongoose');
const session = require("express-session");
const authRoutes = require('./routes/authentication.route');
const taskRoutes = require('./routes/task.route');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true
}))

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

mongoose.connect("mongodb+srv://ekpojeffrey:mary4jeffrey@taskmanager.vgvdnsz.mongodb.net/TaskManager?retryWrites=true&w=majority&appName=TaskManager")
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    })
})
.catch(err => console.log(err))