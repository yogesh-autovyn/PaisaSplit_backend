import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('groups')
export class Group {
  @ObjectIdColumn()
  id: string;

  @Column({ unique: true })
  groupId: string;

  @Column()
  groupName: string;

  @Column()
  groupIcon: string;

  @Column()
  groupType: string;

  @Column()
  memberIds: ObjectId[];

  @Column()
  description: string;

  @Column('json')
  groupSettings: {
    allowAllToAddExpense: boolean;
    inviteOtherAccess: boolean;
    sendNotifications: boolean;
  };

  @Column({ default: true })
  isActive: boolean;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  createdBy: ObjectId;
}
