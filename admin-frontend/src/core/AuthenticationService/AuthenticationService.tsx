import { UserLoginModel, UserRegistrationModel } from "../../models/UserAuthenticationModel";
import RestAxiosService from "../RestAxiosService";

class Authentication {
  static controllerPath = "/auth";
  static login(userData: UserLoginModel) {
    return RestAxiosService.post(`${this.controllerPath}/login`, { email: userData.email, password: userData.passWord });
  }

  static register(userData: UserRegistrationModel) {
    return RestAxiosService.post(`${Authentication.controllerPath}/sign-up`, {
      email: userData.email,
      password: userData.passWord,
      personInfo: { firstName: userData.firstName, lastName: userData.lastName, birthDate: userData.birthDate },
    });
  }
}

export default Authentication;
