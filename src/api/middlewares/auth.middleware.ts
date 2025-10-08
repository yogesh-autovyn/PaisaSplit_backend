// import { Request as ExpressRequest, NextFunction, Response } from 'express';
// // import * as jwt from 'jsonwebtoken';
// // import { ObjectId } from 'mongodb';
// // import { User } from '../models/user.model';
// // import { registerMachineRepository } from '../repositories/register.machine.request.repository';
// // import { adminLoginRepository } from '../repositories/adminLogin.repository';

// // const JWT_SECRET = env.JWT_SECRET || 'defaultSecretKey';

// // export interface Request extends ExpressRequest {
// //   user?: User;
// //   username?: string;
// // }

// export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
//   // const authHeader = req.headers['authorization'];

//   // const token = authHeader?.split(' ')[1];
//   // if (!token) {
//   //   return res.status(401).json({ message: 'Access token missing' });
//   // }

//   try {
//     // const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
//     // const userId = new ObjectId(decoded.id);

//     // const user = await adminLoginRepository.getUserById(userId);

//     // if (!user) {
//     //   return res.status(401).json({ message: 'Invalid token: user not found' });
//     // }

//     // req.user = user;
//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token verification failed', error });
//   }
// };

// export const verifyHardwareId = async (req: Request, res: Response, next: NextFunction) => {
//   const hardwareId = req.headers['hardwareid'] as string;

//   if (!hardwareId) {
//     return res.status(401).json({ message: 'hardwareId missing' });
//   }

//   try {
//     const user = await registerMachineRepository.findOne({
//       where: {
//         username: hardwareId,
//       },
//     });

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid token: user not found' });
//     }

//     req.username = user.username;
//     return next();
//   } catch (error) {
//     return res.status(401).json({ message: 'Token verification failed', error });
//   }
// };
