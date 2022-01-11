import { PackageCreateModel } from "../../models/PackageModel";
import RestAxiosService from "../RestAxiosService";

class PackageService {
  static controllerPath = "/packages";

  static createPackage(packageDetails: PackageCreateModel) {
    return RestAxiosService.post(`${PackageService.controllerPath}`, packageDetails);
  }

  static getPackages() {
    return RestAxiosService.get(`${PackageService.controllerPath}`);
  }

  static getPackageById(packageId: number) {
    return RestAxiosService.get(`${PackageService.controllerPath}/${packageId}`);
  }
}

export default PackageService;
