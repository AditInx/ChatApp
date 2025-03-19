import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve index.html
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

// Handle socket connections
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);  // Broadcast the message to all clients
    });

    socket.off('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(7000, () => {
    console.log(`Server running at http://localhost:7000`);
});
