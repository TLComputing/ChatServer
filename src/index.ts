import cors from "cors";
import express from "express";
import http from "http";

const app = express();
const httpServer = http.createServer(app);
app.use(cors());
app.use(express.static("public"));
app.set("views", "public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

import { Server } from "socket.io";

const mysocket = new Server(httpServer, {
	cors: {
		origin: "*", // Aqui você pode especificar origens específicas ou manter '*' para todas
		methods: ["GET", "POST"], // Métodos HTTP permitidos durante o handshake do CORS
		allowedHeaders: ["my-custom-header"], // Cabeçalhos permitidos
		credentials: true, // Se você precisa de credenciais como cookies ou cabeçalhos de autenticação
	},
});

const messages: any[] = [];
var qtd_users = 0;

mysocket.on("connection", (socket) => {
	console.log("New Connection: " + socket.id);
	console.log("Total Connections: " + mysocket.engine.clientsCount);

	socket.emit("previousMessages", messages);
	var ip = socket.handshake.address;
	console.log(ip);

	// O evento sendMessage é emitido quando um cliente envia
	// a mensagem
	socket.on("sendMessage", (data) => {
		console.log("data00098765555444444: " + JSON.stringify(data, null, 2));
		data["id"] = socket.id;
		data["ip"] = ip;

		messages.push(data);

		// emite o evento "receivedMessage" e dispara a mensagem recebida para todos os demais clientes
		// conectados
		socket.broadcast.emit("receivedMessage", data);
	});

	socket.on("disconnect", (reason) => {
		console.log("Disconnected: " + reason);
	});
});

httpServer.listen(8000);
