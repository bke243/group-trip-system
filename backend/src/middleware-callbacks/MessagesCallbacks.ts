import MessageService from "../services/MessageService";
import { NextFunction, Request, Response } from "express";
import { UserAccountData } from "../middlewares/check-user-auth";
import { MessageCreateDto } from "../models/MessageEntity";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";

class MessageCallbacks {

  constructor() {

  }

  public getAllMessages = async (request: Request<{}, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    return  MessageService.getMessages().then((messages) => {
        return response.json(messages);
    }).catch((error) => {
        return response.json({ error });
    })
  }

  public getAllMessagesByUserOrAdmin = async (request: Request<{ userOrAdminId?: number}, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    const userOrAdminId = request.params?.userOrAdminId;
    if (!this.isNumber(userOrAdminId!)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the id of the sender or receiver or improper data type"});
    return  MessageService.getMessagesByUserOrAdminId(userOrAdminId!).then((messages) => {
        return response.json(messages);
    }).catch((error) => {
        return response.json({ error });
    })
  }

  public createMessage = async (request: Request<{}, {}, AdminMessageCreate>, response: Response, next: NextFunction) => {
    const requestBody = request.body

    const messageEntity = await MessageService.createMessageEntity({ 
      content: requestBody.content,
      destinationId: requestBody.receiverId,
      originId: requestBody.userAccountData.userAccountId });

    return  MessageService.saveMessageEntity(messageEntity).then((message) => {
        return response.json(message);
    }).catch((error) => {
        return response.json({ error });
    })
  }

  private  isNumber = (value: string | number) =>{
    return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
 }

}

interface AdminMessageCreate extends MessageCreateDto {
  userAccountData: UserAccountData
}

export default new MessageCallbacks();