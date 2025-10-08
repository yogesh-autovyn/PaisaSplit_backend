/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { User } from '../models/user.model';
import { userRepository } from '../repositories/user.repositorie';

@Service()
@JsonController('')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class UserController {
  @Post('/signup')
  async signup(@Body() body: any): Promise<any> {
    const user = new User();
    Object.assign(user, body);
    try {
      userRepository.createUser(user);
      return { message: 'User created successfully' };
    } catch (error) {
      return { message: 'Error creating user', error };
    }
  }
}
