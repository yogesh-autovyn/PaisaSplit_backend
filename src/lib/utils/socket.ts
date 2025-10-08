// // src/lib/utils/socket.ts

// import { Socket, Server as SocketIOServer } from 'socket.io'; // ✅ fixed import order
// import { FileAuditMeta } from './socket.types';

// let io: SocketIOServer | null = null;
// export function setIO(server: SocketIOServer) {
//   io = server;

//   io.on('connection', (socket: Socket) => {
//     console.warn(`Socket connected: ${socket.id}`);

//     socket.on('join-room', roomName => {
//       socket.join(roomName);
//       io.in(roomName).emit('user-joined', { userName: roomName });
//     });

//     socket.on('get-by-username-logs', (userName: string) => {
//       emitToRoom(userName, 'get-user-logs', userName);
//     });

//     socket.on('user-logs', data => {
//       emitToRoom(data.username, 'user-logs-response', data.files);
//     });

//     socket.on('select-file', (data: { username: string; file: FileAuditMeta }) => {
//       emitToRoom(data.username, 'file-selected', data);
//     });

//     // socket.on('log-file-content', data => {
//     //   emitToRoom(data.username, 'file-content', data.content);
//     // });
//     socket.on('log-file-chunk', data => {
//       emitToRoom(data.username, 'file-content', data);
//     });

//     registerSocketEvents(socket);

//     socket.on('disconnect', () => {
//       console.warn(`Socket disconnected: ${socket.id}`);
//     });
//   });
// }

// /**
//  * Access the io instance globally
//  */
// export function getIO(): SocketIOServer {
//   if (!io) {
//     throw new Error('Socket.IO not initialized!');
//   }
//   return io;
// }

// /**
//  * Common emit function to broadcast to all connected clients
//  */
// export function emit<T>(event: string, data?: T): void {
//   if (!io) {
//     throw new Error('Socket.IO not initialized!');
//   }
//   io.emit(event, data);
// }

// /**
//  * Common emit function to send to a specific room
//  */
// export function emitToRoom<T>(room: string, event: string, data?: T): void {
//   if (!io) {
//     throw new Error('Socket.IO not initialized!');
//   }
//   io.in(room).emit(event, data);
// }

// export function on<T>(event: string, callback: (data: T, socket: Socket) => void): void {
//   if (!io) {
//     throw new Error('Socket.IO not initialized!');
//   }

//   io.on('connection', (socket: Socket) => {
//     socket.on(event, (data: T) => {
//       callback(data, socket);
//     });
//   });
// }

// /**
//  * Common function to listen for events on sockets in a specific room
//  */

// export function onRoom<T>(
//   room: string,
//   event: string,
//   callback: (data: T, socket: Socket) => void,
// ): void {
//   if (!io) {
//     throw new Error('Socket.IO not initialized!');
//   }

//   io.on('connection', (socket: Socket) => {
//     socket.on(event, (data: T) => {
//       if (socket.rooms.has(room)) {
//         callback(data, socket);
//       }
//     });
//   });
// }

// /**
//  * Handle all socket event listeners here
//  */
// export function registerSocketEvents(socket: Socket): void {
//   socket.on('ping', data => {
//     console.warn('Received ping:', data);

//     socket.emit('server-data', {
//       userId: 123,
//       name: 'Sourabh',
//       status: 'active',
//     });
//   });
// }
