// // src/loaders/socketLoader.ts

// import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
// import { Server as SocketIOServer } from 'socket.io';
// import { env } from '../env';
// import { setIO } from '../lib/utils/socket';

// export const socketLoader: MicroframeworkLoader = (settings?: MicroframeworkSettings) => {
//   if (settings) {
//     const server = settings.getData('express_server');

//     if (server && env.socket.enabled) {
//       const io = new SocketIOServer(server, {
//         cors: {
//           origin: '*',
//         },
//         path: env.socket.route,
//       });

//       setIO(io);
//     }
//   }
// };
