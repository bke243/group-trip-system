import { getConnectionManager, Repository } from "typeorm";
import AccountEntity, { AccountCreationDto } from "../models/AccountEntity";
import PersonEntity from "../models/PersonEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class PersonService {
  private personRepository: Repository<PersonEntity>;
  constructor() {
    this.personRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(PersonEntity);
  }

  public getRepository = () => {
    return this.personRepository;
  }

  public getPersons = async () => {
    const repository = this.getRepository();
    return repository.find();
  }

  public createPersonEntity = async (newPersonAccount: AccountEntity, newPersonDetails: AccountCreationDto) => {
    const repository = this.getRepository();
    return repository.create({ 
        firstName: newPersonDetails.firstName,
        lastName: newPersonDetails.lastName,
        birthDate: newPersonDetails.birthDate,
        telephone: newPersonDetails.telephone,
        account: newPersonAccount.id,
        accountId: newPersonAccount.id,
     })
  }

  public savePerson = async (person: PersonEntity) => {
    const repository = this.getRepository();
    return repository.save(person);
  }

  public findPersonByAccountId = async (accountId: number) => {
    const repository = this.getRepository();
    return repository.findOne({ where: { accountId: accountId  }});
  }
}

export default new PersonService();