import { getConnectionManager, Repository } from "typeorm";
import CityEntity from "../models/CityEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class CityService {
  private cityRepository: Repository<CityEntity>;
  constructor() {
    this.cityRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(CityEntity);
  }

  public getRepository = () => {
    return this.cityRepository;
  }

  public getCity = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createCityEntity = async (city: { name: string, countryId: number }) => {
    const repository = this.getRepository();
    return repository.create({ 
        name: city.name,
        country: city.countryId,
        countryId: city.countryId,
     });
  }

  public saveCity = async (country: CityEntity) => {
    const repository = this.getRepository();
    return repository.save(country);
  }

  public findCityById = async (contryId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { id: contryId  }});
  }
}

export default new CityService();