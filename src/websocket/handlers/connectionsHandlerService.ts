import { Socket } from "socket.io";

export default class ConnectionsHandlerService {
	private messages: any[] = [];

	handleUserConnected(socket: Socket) {
		console.log(`Usuário conectado: ${socket.id}`);
		socket.on("sendMessage", (data) => {
			var ip = socket.handshake.address;

			data["id"] = socket.id;
			data["ip"] = ip;

			// previne um tipo simples de XSS
			const msg: string = data.message;
			if (msg.indexOf("<script>") >= 0) {
				console.log("XSS detected");
				data["message"] = "<b style='color:red;'>XSS detected</b>";
			}

			this.messages.push(data);

			// emite o evento "receivedMessage" e dispara a mensagem recebida para todos os demais clientes
			// conectados
			socket.broadcast.emit("receivedMessage", data);
		});

		socket.on("disconnect", () => {
			this.handleUserDisconnected(socket);
		});
	}

	handleUserDisconnected(socket: Socket) {
		console.log(`Usuário desconectado: ${socket.id}`);
	}
}
