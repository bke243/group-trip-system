import { getConnectionManager, Repository } from "typeorm";
import AccountEntity from "../models/AccountEntity";
import UserEntity from "../models/UserEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class UserService {
  private userRepository: Repository<UserEntity>;
  constructor() {
    this.userRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(UserEntity);
  }

  public getRepository = () => {
    return this.userRepository;
  }

  public getUsers = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createUserEntity = async (newPersonAccount: AccountEntity) => {
    const repository = this.getRepository();
    return repository.create({ 
        account: newPersonAccount.id,
        accountId: newPersonAccount.id,
     })
  }

  public saveUser = async (user: UserEntity) => {
    const repository = this.getRepository();
    return repository.save(user);
  }

  public findUserByAccountId = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { accountId: accountId  }});
  }
}

export default new UserService();