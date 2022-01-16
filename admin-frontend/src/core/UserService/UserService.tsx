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

  static ActivatekUserByAccountId(userAccountId: number) {
    return RestAxiosService.post(`${UserService.controllerPath}/block/${userAccountId}`);
  }

  static blockUserByAccountId(userAccountId: number) {
    return RestAxiosService.post(`${UserService.controllerPath}/unblock/${userAccountId}`);
  }
}
  export default UserService;
  