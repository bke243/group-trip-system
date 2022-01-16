import RestAxiosService from "../RestAxiosService";

export interface TokenType {
    token: string;
    type: string;
  }
  
  class UserService {
    static controllerPath = "/users";
  static fetchUsers() {
    return RestAxiosService.get(`${UserService.controllerPath}`);
  }

  }
  
  export default UserService;
  