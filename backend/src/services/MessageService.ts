import { getConnectionManager, Repository } from "typeorm";
import MessageEntity from "../models/MessageEntity";
import { APPLICATION_CONNECTION_NAME } from "../utils/index.util";

class MessageService {
  private messageRepository: Repository<MessageEntity>;
  
  constructor() {
      this.messageRepository = getConnectionManager().get(APPLICATION_CONNECTION_NAME).getRepository(MessageEntity);
  }
  
  getRepository() {
    return this.messageRepository;
  }

  public MessageService = () => {
      return this.messageRepository;
  }

  public getMessages = async () => {
      const repository = this.getRepository();
      return repository.find();
  }

  public createMessageEntity = async (messageDetails: { content: string, originId: number, destinationId: number }) => {
    const repository = this.getRepository();
    return repository.create({
      content: messageDetails.content,
      originId: messageDetails.originId,
      receiverId: messageDetails.destinationId,
      sentDate: new Date(),
    });
  }

  public saveMessageEntity = async (messageEntity: MessageEntity) => {
    const repository = this.getRepository();
    return repository.save(messageEntity);
  }

  public getMessagesCount = async () => {
    const repository = this.getRepository();
    return repository.query(
      `SELECT "receiverId", COUNT ('receiverId') AS “count”
      FROM message_entity
      GROUP BY "receiverId"
	  Order by “count” asc
	  limit 1`
    );
  }


  public getMessagesByUserOrAdminId = async (userOrAdminid: number) => {
    const repository = this.getRepository();
    const originMessages = await repository.find({ where: { originId: userOrAdminid } });
    const destinationMessages = await repository.find({ where: { receiverId: userOrAdminid } });
    return [...originMessages, ...destinationMessages];
  }
 
}

export default new MessageService();