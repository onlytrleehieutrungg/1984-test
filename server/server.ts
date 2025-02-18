import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => { console.log('A user connected');

    socket.on('message', (data) => {
        console.log('Received message:', data);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
})


server.listen(3001, () => {
    console.log('Server is running on port 3001');
});



