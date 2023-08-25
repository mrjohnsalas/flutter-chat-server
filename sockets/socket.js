const { io } = require('../index');
const { checkJWT } = require('../helpers/jwt');
const { connectedUser, disconnectedUser, saveMessage } = require('../controllers/socket');

// Socket messages
io.on('connection', (client) => {

    const [valid, uid] = checkJWT(client.handshake.headers['x-token']);
    if (!valid) { return client.disconnect(); }

    connectedUser(uid);
    console.log('Client connected: ', uid);

    // Join user to a specific room
    client.join(uid);

    // Listen client message
    client.on('personal-message', async (payload) => {
        await saveMessage(payload);
        io.to(payload.to).emit('personal-message', payload);
    });

    client.on('disconnect', () => {
        console.log('Disconnected client: ', uid);
        disconnectedUser(uid);
    });    
});