const User = require('../models/user.model.js')
const bcrypt = require('bcrypt');


const registration = async (req, res) => {
    const { username, password, email } = req.body;
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ username }); // Checking if the user already exists
        if (existingUser) {
            return res.status(409).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password
        const user = new User({ // Creating a new user document
            username,
            email,
            password: hashedPassword
        });
        await user.save(); // Saving the user to the database
        res.send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username }); // Finding the user in the database
        if (user && await bcrypt.compare(password, user.password)) { // Comparing passwords
            req.session.userId = user._id; // Storing user ID in session
            res.send('Login successful');
        } else {
            res.status(401).send('Invalid username or password');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
}

const logout = async (req, res) => {
    req.session.destroy(err => { // Destroying session on logout
        if (err) {
            console.error(err);
            res.status(500).send('Error logging out');
        } else {
            res.send('Logout successful');
        }
    });
}



module.exports = { registration, login, logout }