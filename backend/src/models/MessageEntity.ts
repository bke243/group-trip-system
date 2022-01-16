import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from "typeorm";


@Entity()
class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  originId!: number;
  
  @Column()
  receiverId!: number;

  @Column()
  sentDate!:Date;
}

export default MessageEntity;

export interface MessageCreateDto {
  receiverId: number;
  content: string;
}
