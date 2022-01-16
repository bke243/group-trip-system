import { getConnectionManager, In, Repository } from "typeorm";
import AccountEntity from "../models/AccountEntity";
import PersonEntity from "../models/PersonEntity";
import UserEntity from "../models/UserEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";
import PersonService from "./PersonService";

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

  public getUserWIthPersonalDetails = async () => {
    const repository = this.getRepository();
    const users = await (await repository.find({ relations: ["account"] })).map((user) => ({
      id : user.id,
      accountId: user.accountId,
      email: (user.account as unknown as AccountEntity).email 
    }));

    const usersAccountIds = [...users].map((user) => user.accountId);
    const personsDetails = await (await PersonService.findPersonsByAccountIds(usersAccountIds)).reduce((persons, nextPerson) => {
      persons[nextPerson.accountId] = nextPerson;
      return persons;
    } , {  } as { [id: number]: PersonEntity });
    const usersWithPersonDetails = users.map((user) => ({ ...user, personDetails: personsDetails[user.accountId] }))
    return usersWithPersonDetails;
  }

  public findUserByAccountId = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { accountId: accountId  }});
  }
}

export default new UserService();