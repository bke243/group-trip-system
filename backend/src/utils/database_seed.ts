import { Request, Response, NextFunction} from "express";
import { AccountCreationDto } from "../models/AccountEntity";
import bcrypt from "bcrypt";
import AccountService from "../services/AccountService";
import AdminService from "../services/AdminService";
import PersonService from "../services/PersonService";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import PackageEntity from "../models/PackageEntity";
import LocationEntity from "../models/LocationEntity";
import CountryEntity from "../models/CountryEntity";
import CityEntity from "../models/CityEntity";
import CountryService from "../services/CountryService";
import CityService from "../services/CityService";
import LocationService from "../services/LocationService";
import PackageService from "../services/PackageService";

export const addDummyPackages = async (request: Request, response: Response, next: NextFunction) => {
  const dummySingUpDto: AccountCreationDto = {
    email: "dummy5@gmail.com",
    firstName: "firstname",
    lastName: "last name",
    password: "password",
    telephone: "535735",
    birthDate: "11/07/2021",
  };

  return bcrypt.hash(dummySingUpDto.password, 13).then(async (hashedPassword) => {
    const updatedRequestBody = { ...dummySingUpDto, password: hashedPassword };
    const newAccountEntity = await AccountService.createAccountEntity(updatedRequestBody);
    return  AccountService.saveAccount(newAccountEntity);
    }).then(async (userAccount) => {
      const adminEntity = await AdminService.createAdminEntity(userAccount);
      const personEntity = await PersonService.createPersonEntity(userAccount, dummySingUpDto)
      const admin = await AdminService.saveAdmin(adminEntity);
      await PersonService.savePerson(personEntity);

      const today = new Date();
      const location = new LocationEntity();
      const country = new CountryEntity();
      const city = new CityEntity();
      
      country.name = "France";
      city.name = "Panama";
      location.streetName = "marie curie sklodowskiej";
      location.zipCode ="50-370";
      location.state = "some loaction";

      const createdCountry = await CountryService.saveCountry(country);
      city.country = createdCountry.id;
      city.countryId = createdCountry.id;
      const createdCity = await CityService.saveCity(city);
      location.city = createdCity.id;
      location.cityId = createdCity.id;
      location.country = createdCountry.id;
      location.countryId = createdCountry.id;
      const createdLoaction = await LocationService.saveLocation(location);

      

      const packageNames = ["package 1", "package 2", "package 3", "package 4", "package 5"];
      packageNames.forEach(async (packageName) => {
        const packageEntity = new PackageEntity();
        packageEntity.name = packageName;
        packageEntity.activities = ["It is a long established fact that a reader will be distracted", "It is a long established fact that a reader will be distracted", "It is a long established fact that a reader will be distracted"]
        packageEntity.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry";
        packageEntity.price = 454056;
        packageEntity.created = new Date();
        packageEntity.startDate = new Date();
        packageEntity.endDate = new Date(today.getTime() + 86400000);
        packageEntity.count = 10;
        packageEntity.maxPersons = 10;
        packageEntity.location = createdLoaction.id;
        packageEntity.locationId = createdLoaction.id;
        packageEntity.admin = admin.id;
        packageEntity.adminId = admin.id;
        const createdPackage = await PackageService.savePackage(packageEntity);
        console.log(createdPackage);
      }); 

      return response.status(RESPONSE_STATUS.OK).json({ message: "successfully done"  });
    }).catch((error) => {
      return response.json({ result: error });
    });
}