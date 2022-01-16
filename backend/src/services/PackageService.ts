import { getConnectionManager, Repository } from "typeorm";
import PackageEntity from "../models/PackageEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class PackageService {
  private locationRepository: Repository<PackageEntity>;
  constructor() {
    this.locationRepository = getConnectionManager()
      .get(APPLICATION_CONNECTION_NAME)
      .getRepository(PackageEntity);
  }

  public getRepository = () => {
    return this.locationRepository;
  };

  public getPackages = async () => {
    const repository = this.getRepository();
    return repository.find();
  };

  public createPackageEntity = async (packageCreateData: {
    name: string;
    activities: string[];
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    count: number;
    maxPersons: number;
    locationId: number;
    adminId: number;
  }) => {
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
    });
  };

  public createPackageEntityWithoutKeys = async (packageCreateData: {
    name: string;
    activities: string[];
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    count: number;
    maxPersons: number;
    locationId: number;
    adminId: number;
  }) => {
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
    });
  };

  public savePackage = async (packageEntity: PackageEntity) => {
    const repository = this.getRepository();
    return repository.save(packageEntity);
  };

  public updatePackage = async (
    packageId: number,
    packageEntity: PackageEntity
  ) => {
    const repository = this.getRepository();
    return repository.query(
      `UPDATE package_entity SET 
      name = $2, 
      activities = $3, 
      description = $4,
      price = $5,
      count = $6,
      startDate = $7,
      endDate = $8,
      maxPersons = $9,
      locationId = $10
      WHERE id = $1`,
      [
        packageId,
        packageEntity.name,
        packageEntity.activities,
        packageEntity.description,
        packageEntity.price,
        packageEntity.count,
        packageEntity.startDate,
        packageEntity.endDate,
        packageEntity.maxPersons,
        packageEntity.locationId,
      ]
    );
  };

  public findPackageById = async (packageId: number) => {
    const repository = this.getRepository();
    return repository.findOne({
      where: { id: packageId },
      relations: ["location", "location.city", "location.country"],
    });
  };

  public deletePackageById = async (packageEntity: PackageEntity) => {
    const repository = this.getRepository();
    return repository.delete({ id: packageEntity.id });
  };
}

export default new PackageService();
