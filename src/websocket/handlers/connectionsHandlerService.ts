import { Socket } from "socket.io";

export default class ConnectionsHandlerService {

    handleUserConnected(socket: Socket) {
        console.log(`Usuário conectado: ${socket.id}`);
        socket.on("disconnect", () =>  {
            this.handleUserDisconnected(socket);
        });
    };

    handleUserDisconnected(socket: Socket) {
        console.log(`Usuário desconectado: ${socket.id}`);
    };

};
