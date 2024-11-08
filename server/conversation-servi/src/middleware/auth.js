import { response } from "express";
import { UserServiceClient } from "../clients/userClient.js";

const authenticate = async (request, response, next) => {
    const token = request.headers['authorization'];
    try {
        const user = await UserServiceClient.extractUser(token)
        request.user = user.data;
        next();
    } catch (error) {
        response.status(401).send('Unauthorized');
    }
}

const socketAuthenticate = async (socket, next) => {
    try {        
        const token = socket.handshake.auth?.token;
        const user = await UserServiceClient.extractUser(token)
        socket.handshake.user = user.data;
        next();
    } catch (error) {
        next(new Error('Invalid token'));
    }
}

export { authenticate, socketAuthenticate };