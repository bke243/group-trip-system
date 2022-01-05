import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne, JoinColumn } from "typeorm";
import CountryEntity from "./CountryEntity";

@Entity()
class CityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(type => CountryEntity, country => country.id)
  @JoinColumn()
  country!: number;
  
  @Column()
  countryId!: number;
}

export default CityEntity;
