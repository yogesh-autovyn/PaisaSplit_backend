import { ObjectId } from 'mongodb';
import { Service } from 'typedi';
import { CreateGroupRequest } from '../controllers/request/createGroup.request';
import { CreateGroupResponse } from '../controllers/responses/createGroup.response';
import { groupRepository } from '../repositories/createGroup.repository';

@Service()
export class GroupService {
  async createGroup(body: CreateGroupRequest): Promise<CreateGroupResponse> {
    try {
      const { users, notFoundEmails } = await groupRepository.findUserIdsByEmails(body.emails);

      if (notFoundEmails.length > 0) {
        throw new Error(`The following emails do not exist: ${notFoundEmails.join(', ')}`);
      }

      const memberIds = users.map(user => new ObjectId(user.id));

      // Generate groupId by combining groupName with createdBy userId
      const groupId = `${body.groupName.replace(/\s+/g, '').toLowerCase()}_${body.createdBy}`;

      const groupData = {
        groupId,
        groupName: body.groupName,
        groupIcon: body.groupIcon || null,
        groupType: body.groupType,
        memberIds,
        description: body.description,
        groupSettings: body.groupSettings,
        createdBy: new ObjectId(body.createdBy),
      };

      const group = await groupRepository.createGroup(groupData);

      return {
        success: true,
        message: 'Group created successfully',
        data: {
          id: group.id.toString(),
          groupId: group.groupId,
          groupName: group.groupName,
          groupIcon: group.groupIcon,
          groupType: group.groupType,
          memberIds: group.memberIds.map(id => id.toString()),
          description: group.description,
          groupSettings: group.groupSettings,
          createdAt: group.createdAt,
          createdBy: group.createdBy.toString(),
        },
      };
    } catch (error) {
      throw new Error(`Failed to create group: ${(error as Error).message}`);
    }
  }
}
