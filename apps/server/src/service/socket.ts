import {Server} from "socket.io"
import Redis from 'ioredis'

const pub=new Redis({
    host: "redis-d855e3f-squbix-9411.a.aivencloud.com",
    port : 25658,
    username:"default",
    password:"AVNS_Cu3z6qEZOSWNEiJggyu"
});
const sub=new Redis({
    host: "redis-d855e3f-squbix-9411.a.aivencloud.com",
    port : 25658,
    username:"default",
    password:"AVNS_Cu3z6qEZOSWNEiJggyu"
});

class SocketService{
    private _io:Server;
    constructor(){
        console.log("Init Socket Service...");
        this._io=new Server({
            cors:{
                allowedHeaders:['*'],
                origin:'*'
            }
        });
        sub.subscribe('MESSAGES')
    }

    public initListeners(){
        console.log("Init Socket Listeners..");
        
        const io=this._io;
        io.on('connect',(socket)=>{
            console.log("A User Connected",socket.id)
            socket.on('event:message',async ({message}:{message:string})=>{
                console.log('A New Message Recieved',message)
                //publish the message to a channel
                await pub.publish('MESSAGES',JSON.stringify({message}))
            })
        })
        sub.on('message',(channel,message)=>{
            if(channel==='MESSAGES'){
                console.log("A new messaqge from redis from diff server")
                io.emit('message',message)
            }
        })
    }

    get io(){
        return this._io;
    }
}

export default SocketService;