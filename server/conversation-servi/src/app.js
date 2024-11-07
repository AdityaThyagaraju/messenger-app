import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import { authenticate, socketAuthenticate } from './middleware/auth.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const httpServer = createServer(app);
const socket = new Server(httpServer,  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
  });

socket.use(socketAuthenticate);

socket.on('connection', () => {
    console.log('user connected');
})

app
.get('/conversation', authenticate, (req, res) => {
    res.status(200).send('working');
})


mongoose.connect(
"mongodb+srv://nodejs_adi:zWbABeg01e8jYkxx@cluster0.ihnpy.mongodb.net/conversationsDB?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log('Connected to database successfully');
});

httpServer.listen(8081, () => {
    console.log('***** Server started at port $8081 *****');
})







