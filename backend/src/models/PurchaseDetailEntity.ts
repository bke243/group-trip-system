import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import GroupEntity from "./GroupEntity";
import PackageEntity from "./PackageEntity";

@Entity()
class PurchaseDetailEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  cost!: number;

  @Column()
  paid!: boolean;

  @ManyToOne(type => GroupEntity, group => group.id)
  @JoinColumn()
  group!: number;

  @Column()
  groupId!: number;

  @ManyToOne(type => PackageEntity, packageEntity => packageEntity.id)
  @JoinColumn()
  country!: number;

  @Column()
  countryId!: number;
}

export default PurchaseDetailEntity;
