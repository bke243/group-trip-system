import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn } from "typeorm";
import AccountEntity from "./AccountEntity";

@Entity()
class PersonEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  firstName!: string;
  
  @Column({ nullable: true })
  lastName!: string;

  @Column({ nullable: true })
  telephone!: string;

  @Column({ nullable: true })
  birthDate!: string;

  @OneToOne(type => AccountEntity, account => account.id)
  @JoinColumn()
  account!: number;

  @Column()
  accountId!: number;
}

export default PersonEntity;
