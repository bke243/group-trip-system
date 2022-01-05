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

  
  public savePackage = async (user: PackageEntity) => {
    const repository = this.getRepository();
    return repository.save(user);
  }

  public findPackageById = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { id: accountId  }});
  }
}

export default new PackageService();