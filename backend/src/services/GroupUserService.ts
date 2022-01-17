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

  public deleteGroupUserById = async (groupId: number) => {
    const repository = this.getRepository();
    return repository.delete({ groupId: groupId });
  };


}

export default new GroupUserService();