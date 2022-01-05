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
  user!: number;

  @Column()
  userId!: number;

  @Column()
  membershipAccepted!: boolean
}

export default GroupUserEntity;
