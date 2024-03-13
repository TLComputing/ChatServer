import http from "http";
import { Server } from "socket.io";
import EventManager  from '../websocket/EventManager';
import jwt from 'jsonwebtoken';
import config from '../config';

export const initWebSocketServer = (httpServer: http.Server): void => {
    const io = new Server(httpServer, {
      cors: {
        origin: "*", // Aqui você pode especificar origens específicas ou manter '*' para todas
        methods: ["GET", "POST"], // Métodos HTTP permitidos durante o handshake do CORS
        allowedHeaders: ["my-custom-header"], // Cabeçalhos permitidos
        credentials: true, // Se você precisa de credenciais como cookies ou cabeçalhos de autenticação
      },
    });

    io.use((socket, next) => {
      const token = Array.isArray(socket.handshake.query.token)
    ? socket.handshake.query.token[0]
    : socket.handshake.query.token;
      if (!token) {
          return next(new Error('Authentication error'));
      }

      if (!config.jwtSecret) {
        throw new Error('JWT secret is undefined');
      }

      jwt.verify(token, config.jwtSecret, (err, decoded) => {
          if (err) return next(new Error('Authentication error'));
          // socket.decoded = decoded; // Salva os dados decodificados no objeto socket para uso posterior
          console.log(decoded);
          next();
      });
    });

    EventManager.getInstance(io);

};
