const { io } = require('../index');

// Socket messages
io.on('connection', (client) => {
    console.log('Client connected');

    client.on('disconnect', () => {
        console.log('Disconnected client');
    });    
});