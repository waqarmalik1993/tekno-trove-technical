const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const sequelize = require('./config/sequelize');
const cors = require('cors');
const checkToken = require('./middleware/user_autenticate')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const get = require('multer')()
const app = express();
const PORT = 3000;

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            messege: error.message
        }
    });
});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Login API endpoint
app.post('/auth', get.any(), async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(200).json(
                {
                    status: "failed",
                    message: 'Please register as you are not in our records'
                }
            );
        }

        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json(
                {
                    status: "failed",
                    message: 'Invalid username or password'
                });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, 'mysecretkey', {
            expiresIn: '1h', // Token expiration time (1 hour in this case)
        });

        res.status(200).json({ status: "success",  message: 'Successfully Login',data: user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to log in' });
    }
});
// Create a new user
app.post('/register', get.any(), async (req, res) => {
    try {
        const { name, username, password } = req.body;
        const user = await User.create({ name, username, password });
        res.status(200).json({ status: "success", data: user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user.' });
    }
});

app.get('/get-details', checkToken, async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    try {
        const users = await User.findAndCountAll({
            limit: pageSize,
            offset: (page - 1) * pageSize
        });
        res.status(200).json({ status: "success", data: users.rows, totalUsers: users.count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch users.' });
    }
});


// Set up other routes for authentication, update, delete, etc.

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
        // Synchronize the models with the database
        await sequelize.sync({ force: false });
        console.log('Models have been synchronized');
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});