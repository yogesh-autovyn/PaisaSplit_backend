export interface CreateGroupResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    groupId: string;
    groupName: string;
    groupIcon: string | null;
    groupType: string;
    memberIds: string[];
    description: string;
    groupSettings: {
      allowAllToAddExpense: boolean;
      inviteOtherAccess: boolean;
      sendNotifications: boolean;
    };
    createdAt: Date;
    createdBy: string;
  };
}
