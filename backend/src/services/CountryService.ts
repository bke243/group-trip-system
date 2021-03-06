import { getConnectionManager, Repository } from "typeorm";
import CountryEntity from "../models/CountryEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class CountryService {
  private countryRepository: Repository<CountryEntity>;
  constructor() {
    this.countryRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(CountryEntity);
  }

  public getRepository = () => {
    return this.countryRepository;
  }

  public getCountries = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createCountryEntity = async (country: string) => {
    const repository = this.getRepository();
    return repository.create({ 
        name: country,
     })
  }

  public saveCountry = async (country: CountryEntity) => {
    const repository = this.getRepository();
    const hasCountry = await repository.findOne({ where: { name: country.name } })
    if(hasCountry) return hasCountry;
    return repository.save(country);
  }

  public findCountryById = async (contryId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { id: contryId  }});
  }
}

export default new CountryService();