import http from 'http'
import SocketService from './service/socket';

async function init(){
    const httpServer=http.createServer();
    const PORT=process.env.PORT?process.env.PORT:8000;
    const socketServer=new SocketService();

    socketServer.io.attach(httpServer);

    socketServer.initListeners();

    httpServer.listen(PORT,()=>{
        console.log(`HTTP Server is running on PORT:${PORT}`)
    })
}
 
init()