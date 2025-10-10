import { dataSource } from '../../database/config/ormconfig.default';
import { Group } from '../models/createGroup.model';
import { User } from '../models/user.model';

export const groupRepository = dataSource.getMongoRepository(Group).extend({
  async createGroup(data: Partial<Group>): Promise<Group> {
    const group = this.create({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    });
    return await this.saveGroup(group);
  },

  async saveGroup(body: Group): Promise<Group> {
    return await this.save(body);
  },

  async findUserIdsByEmails(
    emails: string[],
  ): Promise<{ users: User[]; notFoundEmails: string[] }> {
    const userRepository = dataSource.getMongoRepository(User);
    const users = await userRepository.find({
      where: {
        email: { $in: emails },
      },
      select: ['id', 'email'],
    });

    const foundEmails = users.map(user => user.email);
    const notFoundEmails = emails.filter(email => !foundEmails.includes(email));

    return { users, notFoundEmails };
  },
});
