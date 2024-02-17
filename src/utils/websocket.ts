import http from "http";
import { Server } from "socket.io";
import EventManager  from '../websocket/EventManager';

export const initWebSocketServer = (httpServer: http.Server): void => {
    const io = new Server(httpServer, {
      cors: {
        origin: "*", // Aqui você pode especificar origens específicas ou manter '*' para todas
        methods: ["GET", "POST"], // Métodos HTTP permitidos durante o handshake do CORS
        allowedHeaders: ["my-custom-header"], // Cabeçalhos permitidos
        credentials: true, // Se você precisa de credenciais como cookies ou cabeçalhos de autenticação
      },
    });

    EventManager.getInstance(io);

};
