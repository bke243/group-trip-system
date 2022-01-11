import PackageService from "../services/PackageService";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import AdminService from "../services/AdminService";
import CountryService from "../services/CountryService";
import LocationService from "../services/LocationService";
import CityService from "../services/CityService";
import { UserAccountData } from "../middlewares/check-user-auth";
import { CreatePackageDto } from "../models/PackageEntity";

class PackagesCallbacks {

  constructor() {

  }

  

  public getPackages = async (request: Request<{}, {}, any>, response: Response, next: NextFunction) => {
    return  PackageService.getPackages().then((packages) => {
        return response.json(packages);
    }).catch((error) => {
        return response.json({ error });
    })
  }

  public getPackageById = async (request: Request<{ id:string }, {}, any>, response: Response, next: NextFunction) => {
    const packageId = request.params?.id;
    if (!this.isNumber(packageId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({messagr: "Missing the package id or improper data type"});
    return  PackageService.findPackageById(packageId as unknown as number).then((foundPackage) => {
        if (foundPackage) return response.json(foundPackage);
        else return response.status(RESPONSE_STATUS.NOT_FOUND).json({messagr: "Package not found "});
    }).catch((error) => {
        return response.json({ error });
    })
  }

  private  isNumber = (value: string | number) =>{
   return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
}

  public createPackages = async (request: Request<{}, {}, { userAccountData: UserAccountData } & CreatePackageDto >, response: Response, next: NextFunction) => {
    const requestBody = request.body;
    return AdminService.findAdminByEmail(requestBody.userAccountData.email).then(async (adminRequester) => {
      if (!adminRequester) return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({messagr: "Unauthorized"});
      // creating country 
      const countryEntity = await CountryService.createCountryEntity(requestBody.country.toLowerCase());
      const createdCountry = await CountryService.saveCountry(countryEntity);
      
      // create city
      const cityEntity = await CityService.createCityEntity({ name: requestBody.city.toLowerCase(), countryId: createdCountry.id });
      const createdCity = await CityService.saveCity(cityEntity);

      // create loaction
      const locationEnity = await LocationService.createLocationEntity(
        { streetName: requestBody.streetName,
          state: requestBody?.state,
          zipCode: requestBody?.zipCode,
          countryId: createdCountry.id,
          cityId: createdCity.id
        });

      const createdLocation = await LocationService.saveLocation(locationEnity);

      // package
      const packageEntity = await PackageService.createPackageEntity({ ...requestBody, locationId: createdLocation.id, adminId: adminRequester!.id  });
      const createdPackage = await PackageService.savePackage(packageEntity);
      return response.json({ package: createdPackage });

    }).catch((error) => {
      return response.json({ error });
  });
  }
}

export default new PackagesCallbacks();