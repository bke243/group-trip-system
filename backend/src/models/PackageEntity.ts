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

  @Column({  type: "date"  })
  created!: Date;

  @Column({ name: "startdate", type: "date"  })
  startDate!: Date;

  @Column({ name: "enddate",  type: "date"  })
  endDate!: Date;

  @Column()
  count!:number

  @Column({ name: "maxpersons" })
  maxPersons!: number

  @ManyToOne(type => AdminEntity, admin => admin.id)
  @JoinColumn()
  admin!: number;

  @Column({ name: "adminid" })
  adminId!: number;

  @ManyToOne(type => LocationEntity, location => location.id)
  @JoinColumn()
  location!: number;
  
  @Column({ name: "locationid"})
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

export interface UpdatePackageDto {
  id: number;
  name: string;
  activities: string[],
  description: string,
  price: number,
  created: Date,
  startDate: Date,
  endDate: Date,
  count: number,
  maxPersons: number,
  adminId: number,
  locationId: number,
  country: string,
  city: string,
  streetName: string;
  zipCode?: string;
  state?: string;
}

export default PackageEntity;
