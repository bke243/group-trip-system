import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import FeedbackEntity from "./FeedbackEntity";

@Entity()
class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  created!: Date;

  @Column()
  password!: string;

  @Column({ unique: true })
  email!: string;

  @Column({type: 'boolean', default: true, name: "isActive" })
  isActive: boolean = true;

  @OneToMany(() => FeedbackEntity, feedback => feedback.account)
  feedback!: FeedbackEntity[];
}

export interface AccountCreationDto {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
  birthDate?: string;
}

export interface AccountLoginDto {
  password: string;
  email: string;
}

export default AccountEntity;