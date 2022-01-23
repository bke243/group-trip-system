import GroupService from "../services/GroupService";
import GroupUserService from "../services/GroupUserService";
import { NextFunction, Request, Response } from "express";
import { RESPONSE_STATUS } from "../middlewares/request-body-validator";
import { UserAccountData } from "../middlewares/check-user-auth";
import GroupEntity from "../models/GroupEntity";
import GroupUserEntity, {
  CreateGroupUserDto,
  UpdateGroupDto,
  AddMemberGroupUserDto,
} from "../models/GroupUserEntity";
import { CreateGroupDto } from "../models/GroupEntity";
import UserService from "../services/UserService";
import AccountService from "../services/AccountService";
import AdminService from "../services/AdminService";



const nodemailer = require("nodemailer");

const sendgridTransport = require("nodemailer-sendgrid-transport");
const sendgrid_api_key = "";
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
      sendgrid_api_key,
    },
  })
);
class GroupUserCallbacks {
  constructor() {}

  private isNumber = (value: string | number) => {
    return value != null && value !== "" && !isNaN(Number(value.toString()));
  };

  public verifyUser = (
    request: Request<
      { userId: string; groupId: string },
      {},
      { userAccountData: UserAccountData } & CreateGroupUserDto &
        AddMemberGroupUserDto
    >,
    response: Response,
    next: NextFunction
  ) => {
    const updatedGroupUser =  GroupUserService.verifyUser(
      parseInt(request.params?.userId),
      parseInt(request.params?.groupId)
    );
    if (!updatedGroupUser) return response.status(RESPONSE_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Inter server error"});

    return response.json({ groupUser: updatedGroupUser });
  };

  public addGroupUserByUserEmail = async (
    request: Request<
      {},
      {},
      { userAccountData: UserAccountData } & CreateGroupUserDto &
        AddMemberGroupUserDto
    >,
    response: Response,
    next: NextFunction
  ) => {
    const groupId = request.body.groupId;

    return GroupService.findGroupById(groupId as unknown as number).then(
      async (foundGroup) => {
        if (!foundGroup)
          return response
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "Group not found " });
        const foundUser = await UserService.findUserByAccountId(
          request.body.userAccountData.userAccountId
        );
        const requesterId = foundUser?.id;
        if (foundGroup.ownerId !== requesterId)
          return response
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "Requester has no permission!" });
        const emailAccount = await AccountService.findAccountByEmail(
          request.body.email
        );
        const userEmailAccount = await UserService.findUserByAccountId(
          emailAccount?.id!
        );
        if (!userEmailAccount)
          return response
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "Email not found " });
        const groupUserBody = {
          groupId: groupId,
          userId: userEmailAccount.id,
          membershipAccepted: false,
        };
        const newGroupUserEntity = await GroupUserService.createGroupUserEntity(
          groupUserBody
        );
        const foundGroupUser =
          await GroupUserService.findGroupUserByGroupIdUserId(
            groupId,
            userEmailAccount.id
          );
        if (foundGroupUser)
          return response
            .status(RESPONSE_STATUS.NOT_FOUND)
            .json({ message: "Invitation already sent!" });
        const createdGroupUser = await GroupUserService.saveGroupUser(
          newGroupUserEntity
        );
        return GroupUserService.getGroupUserByGroupId(groupId)
          .then((foundGroupCollection) => {
            for (let index = 0; index < foundGroupCollection.length; index++) {
              const element = foundGroupCollection[index];
              console.log(process.env.SEND_GRID_API_KEY);
              
              const user = element.user;
              const account = user.account;
              if (account.email === request.body.email) {
                if (element.membershipAccepted === true)
                  return response.json({ message: "Already member!" });
                else {
                  transporter.sendMail({
                    to: request.body.email,
                    from: "",
                    subject: "Group trip invitation!",
                    html:
                      "Click to accept <a href='http://127.0.0.1:5000/groupUser/verify/" +
                      element.userId +
                      "/" +
                      element.groupId +
                      "'> invitation!</a>",
                  });

                  return response.json({ message: "Ok!" });
                }
              }
            }
            return response.json({ message: "Something went wrong!" });
          })
          .catch((error) => {
            next(error);
          });
      }
    );
  };

  public deleteGroupUserByUserId = async (
    request: Request<
      { userId: string; groupId: string },
      { userAccountData: UserAccountData },
      any
    >,
    response: Response,
    next: NextFunction
  ) => {
    const userId = parseInt(request.params?.userId);
    const groupId = parseInt(request.params?.groupId);

    if (!this.isNumber(userId))
      return response
        .status(RESPONSE_STATUS.BAD_REQUEST)
        .json({ message: "Missing the user id or improper data type" });

    return GroupService.findGroupById(groupId)
      .then(async (requesterGroup) => {
        const foundUser = await UserService.findUserByAccountId(
          request.body.userAccountData.userAccountId
        );
        if (requesterGroup?.ownerId !== foundUser?.id) {
          return response
            .status(RESPONSE_STATUS.UNAUTHORIZED)
            .json({ message: "User has no permission!" });
        }
        const deleteGroupUserResult = GroupUserService.deleteGroupUserByUserId(
          userId,
          groupId
        );
        return response.json(deleteGroupUserResult);
      })
      .catch((error) => {
        next(error);
      });
  };
}

export default new GroupUserCallbacks();
