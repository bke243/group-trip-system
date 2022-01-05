import { Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, Column } from "typeorm";
import AccountEntity from "./AccountEntity";

@Entity()
class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(type => AccountEntity, account => account.id)
  @JoinColumn()
  account!: number;

  @Column()
  accountId!: number;
}

export default AdminEntity;
