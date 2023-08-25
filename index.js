const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config
require('./database/config').dbConnection();

// Express app
const app = express();

// read and parse body
app.use(express.json());

// Node server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

// Routes
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

server.listen(process.env.PORT, (error) => {
    
    if (error) throw new Error('Something bad happened...', error);

    console.log('Server is running at port:', process.env.PORT);
});