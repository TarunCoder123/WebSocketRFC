import express, { Request, Response } from "express";
import http, { Server } from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);

// Normal HTTP route
app.get("/", (req, res) => {
    res.send("This is a normal HTTPS/HTTP page.");
});

//Create WS server
const wss = new WebSocket.Server({port:8080,verifyClient: (info,cb)=>{
    console.log("🚀 ~ info:", info.req)
    // During postman
    const origin=String(info?.origin || info.req.headers.origin);
    const allowedOrigin=['http://localhost:5173'];

    if(allowedOrigin.includes(origin)){
        cb(true);
    }else{
        console.warn("Not allowed to talk to the server");
        cb(false,403,'forbidden');
    }
} });
// console.log("🚀 ~ wss:", wss)

//Handle WebSocket connection
wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        console.log("VPN traffic received:", msg.toString());

        //send wrapped VPN response
        ws.send("Received: " + msg);
    });
});

//Upgrad HTTP -> WebSocket
server.on("upgrade",(req,socket,head)=>{
    console.log(head,"head")
    if(req.url==="/ws"){
        console.log("inside");
        wss.handleUpgrade(req,socket,head,(ws)=>{
            // console.log(ws);
            wss.emit("connection",ws,req);
        });
    }else {
        socket.destroy();
    }
});

server.listen(3000, () => console.log("Server runnning on 3000"));

// NDKDE+zJvpnPHtVBmQ0Qzw==
