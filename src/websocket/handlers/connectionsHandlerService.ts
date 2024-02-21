import { Socket } from "socket.io";

export default class ConnectionsHandlerService {

    private messages: any[] = [];

    handleUserConnected(socket: Socket) {
        
        console.log(`Connected user: ${socket.id}`);
        socket.emit("previousMessages", this.messages);

        socket.on("sendMessage", (data) => {

            var ip = socket.handshake.address;
            data["id"] = socket.id;
            data["ip"] = ip;
            console.log(data);
            
            this.messages.push(data);

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
