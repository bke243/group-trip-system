import { MessageCreateDto } from "../../store/userSlice";
import RestAxiosService from "../RestAxiosService";

export interface TokenType {
    token: string;
    type: string;
  }
  
  class UserService {
    static controllerPath = "/users";
    static messageControllerPath = "/messages/admin";
  static fetchUsers() {
    return RestAxiosService.get(`${UserService.controllerPath}`);
  }

  static ActivatekUserByAccountId(userAccountId: number) {
    return RestAxiosService.post(`${UserService.controllerPath}/block/${userAccountId}`);
  }

  static blockUserByAccountId(userAccountId: number) {
    return RestAxiosService.post(`${UserService.controllerPath}/unblock/${userAccountId}`);
  }

  static sendMessageToUser(messageDetails: MessageCreateDto) {
    return RestAxiosService.post(`${UserService.messageControllerPath}`, messageDetails);
  }

  static fetchUserMessagesById(userId: number) {
    return RestAxiosService.get(`/messages/${userId}`);
  }

}
  export default UserService;
  