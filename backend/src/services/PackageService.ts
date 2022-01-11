import { getConnectionManager, Repository } from "typeorm";
import PackageEntity from "../models/PackageEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class PackageService {
  private locationRepository: Repository<PackageEntity>;
  constructor() {
    this.locationRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(PackageEntity);
  }

  public getRepository = () => {
    return this.locationRepository;
  }

  public getPackages = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createPackageEntity = async (packageCreateData: { name: string, activities: string[], description: string, price: number, startDate: Date, endDate: Date, count: number, maxPersons: number, locationId: number, adminId: number  }) => {
    const repository = this.getRepository();
    return repository.create({
      name: packageCreateData.name,
      activities: packageCreateData.activities,
      description: packageCreateData.description,
      price: packageCreateData.price,
      created: new Date(),
      startDate: packageCreateData.startDate,
      endDate: packageCreateData.endDate,
      count: packageCreateData.count,
      maxPersons: packageCreateData.maxPersons,
      location: packageCreateData.locationId,
      locationId: packageCreateData.locationId,
      adminId: packageCreateData.adminId,
      admin: packageCreateData.adminId,
    })

  }

  public savePackage = async (user: PackageEntity) => {
    const repository = this.getRepository();
    return repository.save(user);
  }

  public findPackageById = async (packageId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { id: packageId  }});
  }
}

export default new PackageService();