import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import AccountEntity from "./AccountEntity";
import PurchaseDetailEntity from "./PurchaseDetailEntity";

@Entity()
class FeedbackEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(()=> AccountEntity, user => user.feedback, {nullable: false})
  account!: number;

  @ManyToOne(()=> PurchaseDetailEntity, purchase => purchase.feedback, {nullable: false})
  purchase!: number;
  
  @Column({type: 'text', nullable: false})
  feedback!: string;
}

export default FeedbackEntity;