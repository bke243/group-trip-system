import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import PurchaseDetailEntity from "./PurchaseDetailEntity";
import UserEntity from "./UserEntity";

@Entity()
class FeedbackEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @ManyToOne(()=> UserEntity, user => user.feedback, {nullable: false})
  user!: number;

  @ManyToOne(()=> PurchaseDetailEntity, purchase => purchase.feedback, {nullable: false})
  purchase!: number;
  
  @Column({type: 'text', nullable: false})
  feedback!: string;
}

export default FeedbackEntity;