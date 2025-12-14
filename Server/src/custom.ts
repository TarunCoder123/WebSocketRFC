// // Note: Custom headers cannot be set in browser WebSocket API
// // This approach works for server-to-server or native applications

// // Server-side validation
// const wss = new WebSocket.Server({
//     verifyClient: (info, cb) => {
//       const apiKey = info.req.headers['x-api-key'];
//       const signature = info.req.headers['x-signature'];
  
//       if (!apiKey || !signature) {
//         cb(false, 401, 'Missing authentication headers');
//         return;
//       }
  
//       // Verify API key and signature
//       if (!verifyApiKey(apiKey) || !verifySignature(signature, info.req)) {
//         cb(false, 401, 'Invalid credentials');
//         return;
//       }
  
//       cb(true);
//     },
//   });
  


// Server configuration for cookie authentication
// const session = require('express-session');
// const WebSocket = require('ws');

// // Configure session middleware
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: true, // HTTPS only
//       httpOnly: true,
//       sameSite: 'strict', // CSRF protection
//       maxAge: 86400000, // 24 hours
//     },
//   })
// );

// // WebSocket server with session parsing
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ noServer: true });

// server.on('upgrade', (request, socket, head) => {
//   // Parse session from cookie
//   session(request, {}, () => {
//     if (!request.session || !request.session.userId) {
//       socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
//       socket.destroy();
//       return;
//     }

//     wss.handleUpgrade(request, socket, head, (ws) => {
//       ws.userId = request.session.userId;
//       wss.emit('connection', ws, request);
//     });
//   });
// });