import PackageService from "../services/PackageService";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import AdminService from "../services/AdminService";
import CountryService from "../services/CountryService";
import LocationService from "../services/LocationService";
import CityService from "../services/CityService";
import { UserAccountData } from "../middlewares/check-user-auth";
import { CreatePackageDto, UpdatePackageDto } from "../models/PackageEntity";
import LocationEntity from "../models/LocationEntity";
import CityEntity from "../models/CityEntity";
import CountryEntity from "../models/CountryEntity";

class PackagesCallbacks {

  constructor() {

  }

  

  public getPackages = async (request: Request<{}, {}, any>, response: Response, next: NextFunction) => {
    return  PackageService.getPackages().then((packages) => {
        return response.json(packages);
    }).catch((error) => {
        return response.status(500).json({ error });
    })
  }

  public getPackageById = async (request: Request<{ id:string }, {}, any>, response: Response, next: NextFunction) => {
    const packageId = request.params?.id;
    if (!this.isNumber(packageId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the package id or improper data type"});
    return  PackageService.findPackageById(packageId as unknown as number).then((foundPackage) => {
      if (!foundPackage) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Package not found "});
      const flatPackage = { ...foundPackage } as any;
      const packageLocation = flatPackage.location as LocationEntity & { city: CityEntity, country: CountryEntity };
      flatPackage.city = packageLocation.city.name;
      flatPackage.country = packageLocation.country.name;
      flatPackage.streetName = packageLocation.streetName;
      flatPackage.zipCode = packageLocation?.zipCode;
      flatPackage.state = packageLocation?.state;
      delete flatPackage.location;
      return response.json(flatPackage);
    }).catch((error) => {
        return response.status(500).json({ error });
    })
  }

  private  isNumber = (value: string | number) =>{
   return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
}

  public createPackages = async (request: Request<{}, {}, { userAccountData: UserAccountData } & CreatePackageDto >, response: Response, next: NextFunction) => {
    const requestBody = request.body;
    return AdminService.findAdminByEmail(requestBody.userAccountData.email).then(async (adminRequester) => {
      if (!adminRequester) return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({message: "Unauthorized"});
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
      return response.status(500).json({ error });
  });
  }

  public updatePackage = async (request: Request<{ id: string }, {}, { userAccountData: UserAccountData } & UpdatePackageDto >, response: Response, next: NextFunction) => {
    const packageId = request.params?.id;
    const requestBody = request.body;
    if (!this.isNumber(packageId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the package id or improper data type"});
    if (parseInt(packageId) !== requestBody.id) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the package id or improper data type"});
    return  PackageService.findPackageById(requestBody.id).then(async (foundPackage) => {
      if (!foundPackage) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Package not found "});
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
      const packageEntity = await PackageService.createPackageEntity({ ...requestBody });
      // delete packageEntity.admin;
      // delete packageEntity.adminId;
      const updatedPackage = await PackageService.updatePackage(requestBody.id, packageEntity);

      // delete flatPackage.location;
      return response.json({ package: updatedPackage });
    }).catch((error) => {
        return response.status(500).json({ error });
    })
  }

  public deletePackageById = async (request: Request<{ id:string }, {}, any>, response: Response, next: NextFunction) => {
    const packageId = request.params?.id;
    if (!this.isNumber(packageId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the package id or improper data type"});
    return  PackageService.findPackageById(packageId as unknown as number).then((foundPackage) => {
      if (!foundPackage) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Package not found "});
      const deletepackageResult = PackageService.deletePackageById(foundPackage);
      return response.json(deletepackageResult);
    }).catch((error) => {
        return response.status(500).json({ error });
    })
  }
}

export default new PackagesCallbacks();