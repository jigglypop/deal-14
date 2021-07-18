// import { IncomingMessage, Server } from 'http'
// import { Socket } from 'socket.io';
// import chatmessageController from "../controllers/chat-message.controller"

// interface IncomingMessageIp extends IncomingMessage {
//     ip?: string | string[] | undefined
// }

// const socketFunc = (server: Server | undefined) => {
//     const io = require('socket.io')(server, {
//         path: '/socket.io',
//         cors: {
//             origin: ["http://localhost:3000"],
//             methods: ["GET", "POST"],
//         }
//     });
//     io.on('connection', (socket: Socket) => {
//         const req: IncomingMessageIp = socket.request
//         const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
//         // 채팅
//         chatmessageController.chatSocket(socket, io)

//         socket.on('disconnect', () => {
//             console.log('클라이언트 접속 해제', ip, socket.id)
//         })
//     })
// }

// export default socketFunc