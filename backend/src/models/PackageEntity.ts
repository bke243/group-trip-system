import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import AdminEntity from "./AdminEntity";
import LocationEntity from "./LocationEntity";

@Entity()
class PackageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column("text", { array: true })
  activities!: string[];
  
  @Column()
  description!: string;
  
  @Column()
  price!:number;

  @Column()
  created!: Date;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column()
  count!:number

  @Column()
  maxPersons!: number

  @ManyToOne(type => AdminEntity, admin => admin.id)
  @JoinColumn()
  admin!: number;

  @Column()
  adminId!: number;

  @ManyToOne(type => LocationEntity, location => location.id)
  @JoinColumn()
  location!: number;
  
  @Column()
  locationId!: number;
}

export interface  CreatePackageDto {
  name: string;
  activities: string[];
  description: string;
  price: number;
  startDate: Date;
  endDate: Date;
  count: number;
  maxPersons: number;
  country: string;
  city: string;
  streetName: string;
  zipCode?: string;
  state?: string;
}

export default PackageEntity;
