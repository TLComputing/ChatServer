import { Socket } from "socket.io";

export default class ConnectionsHandlerService {

    private messages: any[] = [];

    handleUserConnected(socket: Socket) {
        console.log(`Usuário conectado: ${socket.id}`);
        socket.on("sendMessage", (data) => {
            var ip = socket.handshake.address;
            console.log(data);
            data["id"] = socket.id;
            data["ip"] = ip;

            this.messages.push(data);

            // emite o evento "receivedMessage" e dispara a mensagem recebida para todos os demais clientes
            // conectados
            socket.broadcast.emit("receivedMessage", data);
        });
        

        socket.on("disconnect", () =>  {
            this.handleUserDisconnected(socket);
        });
    };

    handleUserDisconnected(socket: Socket) {
        console.log(`Usuário desconectado: ${socket.id}`);
    };

};
