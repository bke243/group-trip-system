import { getConnectionManager, Repository } from "typeorm";
import GroupUserEntity from "../models/GroupUserEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";
import { CreateGroupUserDto } from "../models/GroupUserEntity";

class GroupUserService {
  private groupUserRepository: Repository<GroupUserEntity>;
  constructor() {
    this.groupUserRepository = getConnectionManager()
      .get(APPLICATION_CONNECTION_NAME)
      .getRepository(GroupUserEntity);
  }

  public getRepository = () => {
    return this.groupUserRepository;
  };

  public getGroupUser = async () => {
    const repository = this.getRepository();
    return repository.find();
  };

  public getGroupUserByGroupId = async (groupId: number) => {
    const repository = this.getRepository();
    return repository.find({
      where: { groupId: groupId },
      relations: ["user","user.account"]
    });
  };

  public createGroupUserEntity = async (groupUserCreateData: CreateGroupUserDto) => {
    const repository = this.getRepository();
    return repository.create({
      groupId: groupUserCreateData.groupId,
      userId: groupUserCreateData.userId,
      membershipAccepted: groupUserCreateData.membershipAccepted
    });
  };

  public saveGroupUser = async (groupUserEntity: GroupUserEntity) => {
    const repository = this.getRepository();
    return repository.save(groupUserEntity);
  };

  public findGroupUserById = async (userId: number) => {
    const repository = this.getRepository();
    return repository.findOne({
      where: { userId: userId }
    });
  };

  public findAllGroupUserByUserId = async (userId: number) => {
    const repository = this.getRepository();
    return repository.find({
      where: { userId: userId }
    });
  };

  public findGroupUserByGroupIdUserId = async (groupId: number, userId: number) => {
    const repository = this.getRepository();
    return repository.findOne({
      where: { groupId: groupId, userId: userId }
    });
  };



  public verifyUser = async (
    userId: number,
    groupId: number
  ) => {
    const repository = this.getRepository();
    return repository.query(
      `UPDATE group_user_entity SET 
      "membershipAccepted" = $1
      WHERE "groupId" = $2 and "userId" = $3`,
      [
        true,
        groupId,
        userId

      ]
    );
  };

  public deleteGroupUserByGroupId = async (groupId: number) => {
    const repository = this.getRepository();
    return repository.delete({ groupId: groupId });
  };

  public deleteGroupUserByUserId = async (userId: number, groupId: number) => {
    const repository = this.getRepository();
    return repository.delete({ userId: userId, groupId:  groupId});
  };


}

export default new GroupUserService();
