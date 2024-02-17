import { Socket, Server } from "socket.io";
import ConnectionsHandlerService from "./handlers/connectionsHandlerService";

export default class EventManager {
    private static instance: EventManager;
    private io: Server;
    private connectionsHandlerService: ConnectionsHandlerService;

    private constructor(io: Server) {
        this.io = io;
        this.registerEvents();
        this.connectionsHandlerService = new ConnectionsHandlerService();
    };

    public static getInstance(io: Server): EventManager {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager(io);
        }
        return EventManager.instance;
    };

    private registerEvents(): void {
        this.io.on("connection", (socket: Socket) => {
          this.connectionsHandlerService.handleUserConnected(socket);
        });
    };

};
