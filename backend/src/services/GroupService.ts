import { getConnectionManager, Repository } from "typeorm";
import GroupEntity from "../models/GroupEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";
import { CreateGroupDto } from "../models/GroupEntity";

class GroupService {
  private groupRepository: Repository<GroupEntity>;
  constructor() {
    this.groupRepository = getConnectionManager()
      .get(APPLICATION_CONNECTION_NAME)
      .getRepository(GroupEntity);
  }

  public getRepository = () => {
    return this.groupRepository;
  };

  public getGroups = async () => {
    const repository = this.getRepository();
    return repository.find({relations: ["owner", "owner.account"]});
  };

  public createGroupEntity = async (groupCreateData: CreateGroupDto, ownerId: number) => {
    const repository = this.getRepository();
    return repository.create({
      name: groupCreateData.name,
      created: new Date(),
      ownerId: ownerId,
      destination: groupCreateData.destination,
      description: groupCreateData.description,
    });
  };

  public saveGroup = async (groupEntity: GroupEntity) => {
    const repository = this.getRepository();
    return repository.save(groupEntity);
  };

  public updateGroup = async (
    groupId: number,
    groupEntity: GroupEntity
  ) => {
    const repository = this.getRepository();
    return repository.query(
      `UPDATE group_entity SET 
      name = $1,
      destination = $2,
      description = $3
      WHERE id = $4`,
      [
        groupEntity.name,
        groupEntity.destination,
        groupEntity.description,
        groupId

      ]
    );
  };

  public findGroupById = async (groupId: number) => {
    const repository = this.getRepository();
    return repository.findOne({
      where: { id: groupId }
    });
  };

  public deleteGroupById = async (groupId: number) => {
    const repository = this.getRepository();
    return repository.delete({ id: groupId });
  };
}

export default new GroupService();
