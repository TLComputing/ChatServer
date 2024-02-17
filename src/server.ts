import app from './app'; 
import http from "http";
import config from './config';
import { initWebSocketServer } from './utils/websocket';

const PORT = config.port || 3333;

const httpServer = http.createServer(app);

initWebSocketServer(httpServer);

httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
