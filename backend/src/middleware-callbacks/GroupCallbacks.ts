import GroupService from "../services/GroupService";
import GroupUserService from "../services/GroupUserService";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import { UserAccountData } from "../middlewares/check-user-auth";
import UserEntity from "../models/UserEntity";
import GroupEntity from "../models/GroupEntity";
import GroupUserEntity, { UpdateGroupDto } from "../models/GroupUserEntity";
import { CreateGroupDto } from "../models/GroupEntity";
import UserService from "../services/UserService";
import AccountService from "../services/AccountService";
import AdminService from "../services/AdminService";

class GroupCallbacks {

    constructor() {
  
    }

    public getGroups = async (request: Request<{}, {}, {userAccountData: UserAccountData}>, response: Response, next: NextFunction) => {
      const foundUser = await UserService.findUserByAccountId(request.body.userAccountData.userAccountId);
      if (!foundUser) return response.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({message: "User not found!"});
      const foundUserId = foundUser.id;
      const groupUserCollection = await GroupUserService.findAllGroupUserByUserId(foundUserId);
      let groupCollection = [];
      
      for (let index = 0; index < groupUserCollection.length; index++) {
        const groupId = groupUserCollection[index].groupId;
        const foundGroup = await GroupService.findGroupById(groupId);
        if (!foundGroup) return response.status(500).json("error");
        groupCollection.push(foundGroup);
      }
      
      return response.json(groupCollection);
    }

    private  isNumber = (value: string | number) =>{
      return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
   }
    
    public createGroups = async (request: Request<{}, {}, { userAccountData: UserAccountData } &  CreateGroupDto>, response: Response, next: NextFunction) => {
      const requestBody = request.body;
      return UserService.findUserByAccountId(requestBody.userAccountData.userAccountId).then(async (foundUser) => {
        const newGroupEntity = await GroupService.createGroupEntity(requestBody, foundUser?.id!);
        const createdGroup = await GroupService.saveGroup(newGroupEntity);
  
        
        const groupUserBody = {groupId: createdGroup.id, userId: requestBody.userAccountData.userAccountId, membershipAccepted: true};
        const newGroupUserEntity = await GroupUserService.createGroupUserEntity(groupUserBody);
        const createdGroupUser = await GroupUserService.saveGroupUser(newGroupUserEntity);
        
        return response.json({ createdGroup: createdGroup });
      }).catch((error) => {
        next(error);
    });
    }

    public updateGroup = async (request: Request<{ groupId: string }, {}, { userAccountData: UserAccountData } & UpdateGroupDto >, response: Response, next: NextFunction) => {
      const groupId = request.params?.groupId;
      const requestBody = request.body;
  
      if (!this.isNumber(groupId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the group id or improper data type"});
      if (parseInt(groupId) !== requestBody.groupId) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the group id or improper data type"});
      return  GroupService.findGroupById(requestBody.groupId).then(async (foundGroup) => {
        if (!foundGroup) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Group not found "});
         const foundUser = await UserService.findUserByAccountId(requestBody.userAccountData.userAccountId);
         // group
        const groupEntityBody = {name: requestBody.name, destination: requestBody.destination, description: requestBody.description};
        const groupEntity = await GroupService.createGroupEntity(groupEntityBody, foundUser?.id!);
        
        if (foundGroup.ownerId !== foundUser?.id!){
          return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({message: "User has no permission!"});
        }
        const updatedGroup = await GroupService.updateGroup(requestBody.groupId, groupEntity);
          
        return response.json({ group: updatedGroup });
      }).catch((error) => {
        next(error);
      })
    }

    public deleteGroupById = async (request: Request<{ groupId:string }, {}, { userAccountData: UserAccountData}>, response: Response, next: NextFunction) => {
      const groupId = request.params?.groupId;
      
      if (!this.isNumber(groupId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the group id or improper data type"});
      return  GroupService.findGroupById(groupId as unknown as number).then(async (foundGroup) => {
        if (!foundGroup) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Group not found "});
        const foundUser = await UserService.findUserByAccountId(request.body.userAccountData.userAccountId);
        if (foundGroup.ownerId !== foundUser?.id){
          return response.status(RESPONSE_STATUS.UNAUTHORIZED).json({message: "User has no permission!"});
        }
        const deleteGroupUserResult = GroupUserService.deleteGroupUserByGroupId(foundGroup.id);
        const deleteGroupResult = GroupService.deleteGroupById(foundGroup.id);
        return response.json(deleteGroupResult);
      }).catch((error) => {
        next(error);
      })
    }


  }
  
  export default new GroupCallbacks();