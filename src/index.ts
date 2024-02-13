import express from "express";
import socketio from "socket.io";
import http from "http";
import cors from "cors";

const app = express();
const httpServer = http.createServer(app);
app.use(cors());
app.use(express.static("public"));
app.set("views", "public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");


// const mysocket = new socketio.Server(httpServer);

import { Server } from "socket.io";

const mysocket = new Server(httpServer, {
  cors: {
    origin: "*", // Aqui você pode especificar origens específicas ou manter '*' para todas
    methods: ["GET", "POST"], // Métodos HTTP permitidos durante o handshake do CORS
    allowedHeaders: ["my-custom-header"], // Cabeçalhos permitidos
    credentials: true // Se você precisa de credenciais como cookies ou cabeçalhos de autenticação
  }
});

const messages: any[] = [];
var qtd_users = 0;

mysocket.on("connection", (socket) => {
  console.log("New Connection: " + socket.id);
  console.log("Total Connections: " + mysocket.engine.clientsCount);
  socket.emit("previousMessages", messages);
  var ip = socket.handshake.address;
  console.log(ip);
  socket.on("sendMessage", (data) => {
    console.log("data: " + data);
    data["id"] = socket.id;
    data["ip"] = ip;
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });

  socket.on("disconnect", (reason) => {
    console.log("Disconnected: " + reason);
  });
});

httpServer.listen(3333);
