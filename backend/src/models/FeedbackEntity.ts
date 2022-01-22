import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import AccountEntity from "./AccountEntity";
import PurchaseDetailEntity from "./PurchaseDetailEntity";

@Entity()
class FeedbackEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(()=> AccountEntity, user => user.feedback, {nullable: false})
  user!: AccountEntity;

  @ManyToOne(()=> PurchaseDetailEntity, purchase => purchase.feedback, {nullable: false})
  purchase!: PurchaseDetailEntity;
  
  @Column({type: 'text', nullable: false})
  feedback!: string;
}

export default FeedbackEntity;