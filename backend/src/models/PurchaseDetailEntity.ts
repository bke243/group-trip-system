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

@Entity()
class PurchaseDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cost!: number;

  @Column({type: "boolean", nullable: false, default: "false"})
  paid!: boolean;

  @ManyToOne((type) => GroupEntity, (group) => group.id)
  @JoinColumn()
  group!: number;

  @Column()
  groupId!: number;

  @ManyToOne((type) => PackageEntity, (packageEntity) => packageEntity.id)
  @JoinColumn()
  package!: number;

  @Column()
  packageId!: number;

  @OneToMany(() => FeedbackEntity, feedback => feedback.purchase)
  feedback!: FeedbackEntity[];
}

export default PurchaseDetailEntity;