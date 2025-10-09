import { dataSource } from '../../database/config/ormconfig.default';
import { User } from '../models/user.model';

export const userRepository = dataSource.getMongoRepository(User).extend({
  async createUser(data: Partial<User>): Promise<User> {
    const user = this.create(data);
    return await this.saveUser(user);
  },

  async saveUser(user: User): Promise<User> {
    return await this.save(user);
  },

  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne({ where: { email } });
  },

  async updatePassword(userId: string, password: string): Promise<void> {
    await this.update(userId, { password });
  },
});
