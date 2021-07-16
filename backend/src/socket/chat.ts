// import Chat from '../schemas/chat';
// import { Socket } from 'socket.io';
// import Room from '../schemas/room';

// const chatSocket = (socket: Socket, io: any) => {
//     socket.on('chat message', async (content, roomId) => {
//         await socket.join(roomId)
//         const chat = await new Chat({
//             user: "관리자", 
//             content: content, roomId,
//             createdAt: new Date()
//         })
//         const room = await Room.findById(roomId)
//         if (!room) return
//         await room.chat.push(chat)
//         await room.save()
//         await chat.save()
//         const chats = await Room.findById(roomId)
//         if (!chats) return
//         const _chats = await chats.chat
//         await io.to(roomId).emit('chat message', content, roomId, _chats)
//     })
//     // 채팅 가져오기
//     socket.on('get chat', async (roomId) =>{
//         await socket.join(roomId)
//         const room = await Room.findById(roomId)
//         if (!room) return
//         const chats = await room.chat
//         await io.to(roomId).emit('get chat', chats)
//     })

//     // 채팅 나가기
//     socket.on('leave chat', async (roomId) =>{
//         await socket.leave(roomId)
//     })
// }

// export default chatSocket