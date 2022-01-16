import { PackageCreateModel, PackageDetailReadModel } from "../../models/PackageModel";
import RestAxiosService from "../RestAxiosService";

class PackageService {
  static controllerPath = "/packages";

  static createPackage(packageDetails: PackageCreateModel) {
    return RestAxiosService.post(`${PackageService.controllerPath}`, packageDetails);
  }

  static fetchPackages() {
    return RestAxiosService.get(`${PackageService.controllerPath}`);
  }

  static fetchPackageById(packageId: number) {
    return RestAxiosService.get(`${PackageService.controllerPath}/${packageId}`);
  }

  static updatePackage(packageDetails: PackageDetailReadModel) {
    return RestAxiosService.put(`${PackageService.controllerPath}/${packageDetails.id}`, packageDetails);
  }

  static deletePackage(packageId: number) {
    return RestAxiosService.delete(`${PackageService.controllerPath}/${packageId}`);
  }
}

export default PackageService;
