import { getConnectionManager, Repository } from "typeorm";
import AccountEntity, { AccountCreationDto } from "../models/AccountEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class AccountService {
  private accountRepository: Repository<AccountEntity>;
  constructor() {
    this.accountRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(AccountEntity);
  }

  public getRepository = () => {
    return this.accountRepository;
  }

  public getAccounts = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createAccountEntity = async (newAccountDetails: AccountCreationDto) => {
    const repository = this.getRepository();
    return repository.create({ 
      created: new Date,
      email: newAccountDetails.email,
      password: newAccountDetails.password
     })
  }

  public saveAccount = async (account: AccountEntity) => {
    const repository = this.getRepository();
    return repository.save(account);
  }
}

export default new AccountService();