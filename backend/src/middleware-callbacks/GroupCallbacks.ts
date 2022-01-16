import GroupService from "../services/GroupService";
import GroupUserService from "../services/GroupUserService";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import { UserAccountData } from "../middlewares/check-user-auth";
import GroupEntity from "../models/GroupEntity";
import GroupUserEntity, { UpdateGroupDto } from "../models/GroupUserEntity";
import { CreateGroupDto } from "../models/GroupEntity";
import UserService from "../services/UserService";

class GroupCallbacks {

    constructor() {
  
    }

    private  isNumber = (value: string | number) =>{
      return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
   }
    
    public createGroups = async (request: Request<{}, {}, { userAccountData: UserAccountData } &  CreateGroupDto>, response: Response, next: NextFunction) => {
      const requestBody = request.body;
      console.log(requestBody);
      
  
      // userAccountData.id will be added later
      const newGroupEntity = await GroupService.createGroupEntity(requestBody, 1);
      const createdGroup = await GroupService.saveGroup(newGroupEntity);

      
      const groupUserBody = {groupId: createdGroup.id, userId: 1, membershipAccepted: true};
      const newGroupUserEntity = await GroupUserService.createGroupUserEntity(groupUserBody);
      const createdGroupUser = await GroupUserService.saveGroupUser(newGroupUserEntity);
      
      return response.json({ createdGroup: createdGroup });
      
      
    }

    public updateGroup = async (request: Request<{ groupId: string }, {}, { userAccountData: UserAccountData } & UpdateGroupDto >, response: Response, next: NextFunction) => {
      const groupId = request.params?.groupId;
      const requestBody = request.body;
      if (!this.isNumber(groupId)) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the group id or improper data type"});
      if (parseInt(groupId) !== requestBody.groupId) return response.status(RESPONSE_STATUS.BAD_REQUEST).json({message: "Missing the group id or improper data type"});
      return  GroupService.findGroupById(requestBody.groupId).then(async (foundGroup) => {
        if (!foundGroup) return response.status(RESPONSE_STATUS.NOT_FOUND).json({ message: "Group not found "});
         
         // group
         // userAccountData.id will be added later
         const groupEntityBody = {name: requestBody.name, destination: requestBody.destination, description: requestBody.description};
        const groupEntity = await GroupService.createGroupEntity(groupEntityBody, 1);
   
        const updatedGroup = await GroupService.updateGroup(requestBody.groupId, groupEntity);
  
        
        return response.json({ group: updatedGroup });
      }).catch((error) => {
          return response.status(500).json({ error });
      })
    }


  }
  
  export default new GroupCallbacks();