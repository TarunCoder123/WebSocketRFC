import express, { Request, Response } from "express";
import http, { Server } from "http";
import { parse } from "querystring";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);

// Normal HTTP route
app.get("/", (req, res) => {
    res.send("This is a normal HTTPS/HTTP page.");
});

//Create WS server
// const wss = new WebSocket.Server({
//     noServer: true
// });
const wss = new WebSocket.Server({
    noServer: true, verifyClient: (info, cb) => {
        // During postman
        const origin = String(info?.origin || info.req.headers.origin);
        const allowedOrigin = ['http://localhost:5173'];

        if (allowedOrigin.includes(origin)) {
            cb(true);
        } else {
            console.warn("Not allowed to talk to the server");
            cb(false, 403, 'forbidden');
        }
    }
});
// console.log("🚀 ~ wss:", wss)

const authenticated=(value:string):boolean=>{
    if(value=='abc')return true;
    return false;
}

//Handle WebSocket connection
wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        console.log("VPN traffic received:", msg.toString());

        //send wrapped VPN response
        ws.send("Received: " + msg);
    });
});

//Upgrad HTTP -> WebSocket
server.on("upgrade", (req, socket, head) => {
    // console.log("🚀 ~ socket:", socket)
    // console.log("🚀 ~ head:", head)
    console.log("🚀 ~ req?.url:", req?.url)
    const parsedUrl = parse(String(req?.url));
    console.log("🚀 ~ parsedUrl:", parsedUrl)
    const token = parsedUrl['/ws?token'];

    console.log(token); 

    if(!authenticated(String(token))){
        console.log("andhaar ayaa hai na bhia ")
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }


    if (req.url === "/ws?token=abc") {
        console.log("inside");
        wss.handleUpgrade(req, socket, head, (ws) => {
            // console.log(ws);
            wss.emit("connection", ws, req);
        });
    } else {
        socket.destroy();
    }
});

server.listen(3000, () => console.log("Server runnning on 3000"));

// NDKDE+zJvpnPHtVBmQ0Qzw==
