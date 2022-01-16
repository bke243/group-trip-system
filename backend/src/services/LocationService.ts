import { getConnectionManager, Repository } from "typeorm";
import LocationEntity from "../models/LocationEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class LocationService {
  private locationRepository: Repository<LocationEntity>;
  constructor() {
    this.locationRepository = getConnectionManager()
      .get(APPLICATION_CONNECTION_NAME)
      .getRepository(LocationEntity);
  }

  public getRepository = () => {
    return this.locationRepository;
  };

  public getLocations = async () => {
    const repository = this.getRepository();
    return repository.find({ relations: ["country", "city"] });
  };

  public createLocationEntity = async (location: {
    streetName: string;
    zipCode?: string;
    state?: string;
    countryId: number;
    cityId: number;
  }) => {
    const repository = this.getRepository();
    return repository.create({
      streetName: location.streetName,
      zipCode: location.zipCode,
      state: location.state,
      country: location.countryId,
      countryId: location.countryId,
      cityId: location.cityId,
      city: location.cityId,
    });
  };

  public saveLocation = async (location: LocationEntity) => {
    const repository = this.getRepository();
    const existingLocation = await repository.findOne({
      where: {
        streetName: location.streetName,
        zipCode: location.zipCode,
        state: location.state,
        country: location.countryId,
        countryId: location.countryId,
        cityId: location.cityId,
        city: location.cityId,
      },
    });
    if (existingLocation) return existingLocation;
    return repository.save(location);
  };

  public findLocationByAccountId = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { accountId: accountId } });
  };
}

export default new LocationService();
