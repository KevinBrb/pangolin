// Packages import from npm
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Router import file
const router = require('./router');

// Server port
const port = process.env.PORT || 2222;

// Save express in constant for access to express's methods
const app = express();

// Define who can access to server
const corsOptions = {
    origin: process.env.FRONTEND,
};

// CORS application on server
app.use(cors(corsOptions));

// Parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes prefix
app.use('/v1', router);

let launcher = app;

// Server launch function
app.launch = () => {
    app.listen(port, () => {
        console.log(`Server launched on http://localhost:${port}`)
    });
};

module.exports = app;