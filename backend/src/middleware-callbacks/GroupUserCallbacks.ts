import GroupService from "../services/GroupService";
import GroupUserService from "../services/GroupUserService";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import { UserAccountData } from "../middlewares/check-user-auth";
import GroupEntity from "../models/GroupEntity";
import GroupUserEntity, { CreateGroupUserDto,UpdateGroupDto, AddMemberGroupUserDto } from "../models/GroupUserEntity";
import { CreateGroupDto } from "../models/GroupEntity";
import UserService from "../services/UserService";
import AccountService from "../services/AccountService";
import AdminService from "../services/AdminService";

class GroupUserCallbacks {

    constructor() {
  
    }

    private  isNumber = (value: string | number) =>{
      return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
   }

   public addGroupUserByUserEmail = async (request: Request<{}, {}, { userAccountData: UserAccountData }& CreateGroupUserDto & AddMemberGroupUserDto>, response: Response, next: NextFunction) => {
    // const requesterId = request.body.userAccountData.userAccountId;
    const requesterId = 3;
    const groupId = request.body.groupId;
    console.log(requesterId);
    
    if (!this.isNumber(requesterId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the requester id or improper data type"});
      return  GroupService.findGroupById(groupId as unknown as number).then((foundGroup) => {
        if (!foundGroup) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Group not found "});
        if (foundGroup.ownerId !== requesterId) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Requester has no permission!"});
        return GroupUserService.getGroupUserByGroupId(groupId).then((foundGroupCollection) => {
          for (let index = 0; index < foundGroupCollection.length; index++) {
            const element = foundGroupCollection[index];
            const user = element.user;
            const account = user.account;
           if (account.email === request.body.email){
            return response.json({ message: "Already member!"});
           }
            
          }
          
        }).catch((error) => {
          return response.status(500).json({ error });
      })
    
  })};

    public deleteGroupUserByUserId = async (request: Request<{ userId:string }, { userAccountData: UserAccountData}, any>, response: Response, next: NextFunction) => {
      const userId = request.params?.userId;
      console.log(userId);
      
      if (!this.isNumber(userId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the user id or improper data type"});
      return  GroupUserService.findGroupUserById(userId as unknown as number).then((foundGroupUser) => {
        if (!foundGroupUser) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Group User not found "});
        const deleteGroupUserResult = GroupUserService.deleteGroupUserByUserId(foundGroupUser.userId);
        return response.json(deleteGroupUserResult);
      }).catch((error) => {
          return response.status(500).json({ error });
      })
    }

    


  }
  
  export default new GroupUserCallbacks();