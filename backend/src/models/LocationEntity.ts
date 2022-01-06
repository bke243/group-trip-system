import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import CityEntity from "./CityEntity";
import CountryEntity from "./CountryEntity";

@Entity()
class LocationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  streetName!: string;

  @Column({ nullable: true })
  zipCode!: string;

  @Column({ nullable: true })
  state!: string;

  @ManyToOne(type => CityEntity, city => city.id)
  @JoinColumn()
  city!: number;

  @Column()
  cityId!: number;

  @ManyToOne(type => CountryEntity, country => country.id)
  @JoinColumn()
  country!: number;

  @Column()
  countryId!: number;
}

export default LocationEntity;
