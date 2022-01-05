import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import UserEntity from "./UserEntity";

@Entity()
class GroupEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  created!:Date;

  @ManyToOne(type => UserEntity, user => user.id)
  @JoinColumn()
  owner!: UserEntity;

  @Column()
  ownerId!: UserEntity;
  
  @Column()
  destination!: string;
  
  @Column()
  description!: string;
}

export default GroupEntity;
