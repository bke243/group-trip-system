import MessageService from "../services/MessageService";
import { NextFunction, Request, Response } from "express";
import { UserAccountData } from "../middlewares/check-user-auth";
import { MessageCreateDto } from "../models/MessageEntity";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import AdminService from "../services/AdminService";

class MessageCallbacks {

  constructor() {

  }

  public getAllMessages = async (request: Request<{}, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    return  MessageService.getMessages().then((messages) => {
        return response.json(messages);
    }).catch((error) => {
        return response.status(500).json({ error });
    })
  }

  public getAllMessagesByUserOrAdmin = async (request: Request<{ userOrAdminId?: number}, {}, { userAccountData: UserAccountData }>, response: Response, next: NextFunction) => {
    const userOrAdminId = request.params?.userOrAdminId;
    if (!this.isNumber(userOrAdminId!)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the id of the sender or receiver or improper data type"});
    return  MessageService.getMessagesByUserOrAdminId(userOrAdminId!).then((messages) => {
        return response.json(messages);
    }).catch((error) => {
        return response.status(500).json({ error });
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
        return response.status(500).json({ error });
    })
  }

  public createMessageForUser = async (request: Request<{}, {}, AdminMessageCreate>, response: Response, next: NextFunction) => {
    const requestBody = request.body
    const adminRep = await AdminService.getAdmins();
    const messageCount = await MessageService.getMessagesCount();
   
    
    if (messageCount) {
      const adminAccountId = messageCount[0].receiverId;
      const messageEntity = await MessageService.createMessageEntity({ 
      content: requestBody.content,
      destinationId: adminAccountId,
      originId: requestBody.userAccountData.userAccountId });

    return  MessageService.saveMessageEntity(messageEntity).then((message) => {
        return response.json(message);
    }).catch((error) => {
        return response.status(500).json({ error });
    })
    }
    if (adminRep){
      const messageEntity = await MessageService.createMessageEntity({ 
        content: requestBody.content,
        destinationId: adminRep[0].accountId,
        originId: requestBody.userAccountData.userAccountId });
  
      return  MessageService.saveMessageEntity(messageEntity).then((message) => {
          return response.json(message);
      }).catch((error) => {
          return response.status(500).json({ error });
      })
    }else {
      return response.json({error: "Error"});
    }
    
  }

  private  isNumber = (value: string | number) =>{
    return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
 }

}

interface AdminMessageCreate extends MessageCreateDto {
  userAccountData: UserAccountData
}

export default new MessageCallbacks();