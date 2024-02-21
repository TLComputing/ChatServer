import app from './app'; 
import http from "http";
import config from './config';
import { initWebSocketServer } from './utils/websocket';
import { connectDB } from './database/index';
import userRouter from './routes';

const PORT = config.port || 3333;

app.use('/api', userRouter); // Todas as rotas começarão com /api

const httpServer = http.createServer(app);

initWebSocketServer(httpServer);

connectDB().then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
  }).catch((error) => {
    console.error('Database connection failed ', error);
  });

