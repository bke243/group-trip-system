import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Column, OneToMany } from "typeorm";
import AccountEntity from "./AccountEntity";
import FeedbackEntity from "./FeedbackEntity";

@Entity()
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(type => AccountEntity, account => account.id)
  @JoinColumn()
  account!: AccountEntity;

  @Column()
  accountId!: number;

  @OneToMany(() => FeedbackEntity, feedback => feedback.user)
  feedback!: FeedbackEntity[];
}

export default UserEntity;
