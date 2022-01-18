import { Column, Entity, BaseEntity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import GroupEntity from "./GroupEntity";
import UserEntity from "./UserEntity";

@Entity()
class GroupUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(type => GroupEntity, group => group.id)
  @JoinColumn()
  group!: number;

  @Column()
  groupId!: number;

  @ManyToOne(type => UserEntity, user => user.id)
  @JoinColumn()
  user!: UserEntity;

  @Column()
  userId!: number;

  @Column()
  membershipAccepted!: boolean
}

export interface  CreateGroupUserDto {
  groupId: number,
  userId: number,
  membershipAccepted: boolean,
}

export interface  AddMemberGroupUserDto {
  email: string,
  groupId: number,

}

export interface UpdateGroupDto {
  groupId: number;
  name: string;
  destination: string;
  description: string;
}

export default GroupUserEntity;
