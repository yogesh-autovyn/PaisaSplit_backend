/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestError, Body, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import { GroupService } from '../services/createGroup.service';
import { CreateGroupRequest } from './request/createGroup.request';
import { CreateGroupResponse } from './responses/createGroup.response';

@Service()
@JsonController('/groups')
@OpenAPI({ security: [{ bearerAuth: [] }] })
export class GroupController {
  constructor(private groupService: GroupService) {}

  @Post('/create')
  @OpenAPI({
    summary: 'Create a new group',
    description: 'Creates a new group with the provided details',
  })
  async createGroup(@Body() body: CreateGroupRequest): Promise<CreateGroupResponse> {
    try {
      const result = await this.groupService.createGroup(body);
      return result;
    } catch (error) {
      throw new BadRequestError((error as Error).message);
    }
  }
}
