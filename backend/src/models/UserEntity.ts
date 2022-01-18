import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Column } from "typeorm";
import AccountEntity from "./AccountEntity";

@Entity()
class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(type => AccountEntity, account => account.id)
  @JoinColumn()
  account!: AccountEntity;

  @Column()
  accountId!: number;
}

export default UserEntity;
