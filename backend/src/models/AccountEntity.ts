import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

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
}

export interface AccountCreationDto {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  telephone: string;
}

export default AccountEntity;
