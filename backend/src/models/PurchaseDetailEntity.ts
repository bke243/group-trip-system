import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import FeedbackEntity from "./FeedbackEntity";
import GroupEntity from "./GroupEntity";
import PackageEntity from "./PackageEntity";

enum PurchaseStatus {
  CREATED = "created",
  PAID = "paid",
  DONE = "done",
}

@Entity()
class PurchaseDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cost!: number;

  @Column({type: "enum", enum: PurchaseStatus, default: PurchaseStatus.CREATED})
  purchase_status!: string;

  @ManyToOne((type) => GroupEntity, (group) => group.id)
  @JoinColumn()
  group!: GroupEntity;

  @Column()
  groupId!: number;

  // @ManyToOne((type) => PackageEntity, (packageEntity) => packageEntity.id)
  // @JoinColumn()
  // country!: number;

  // @Column()
  // countryId!: number;

  @OneToMany(() => FeedbackEntity, feedback => feedback.purchase)
  feedback!: FeedbackEntity[];
}

export default PurchaseDetailEntity;