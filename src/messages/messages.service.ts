import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesEntity } from './messages-entity/messages-entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
  ) {}

  private lastId = 1;
  private messages: MessagesEntity[] = [
    {
      id: 1,
      text: 'This is a test',
      from: 'Pedro',
      to: 'Luiz',
      read: false,
      date: new Date(),
    },
  ];

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findById(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });
    if (message) return message;
    throw new NotFoundException('Message not found');
  }

  async create(createdMessageDto: CreateMessageDto) {
    const newMessage = {
      ...createdMessageDto,
      read: false,
      date: new Date(),
    };
    return this.messageRepository.save(
      this.messageRepository.create(newMessage),
    );
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const indexMessage = this.messages.findIndex((item) => item.id === +id);

    if (indexMessage < 0) throw new NotFoundException('Message not found');
    if (indexMessage >= 0) {
      const existingMessage = this.messages[indexMessage];

      this.messages[indexMessage] = {
        ...existingMessage,
        ...updateMessageDto,
      };
    }

    return this.messages[indexMessage];
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });
    if (!message) throw new NotFoundException('Message not found');
    return this.messageRepository.remove(message);
  }

  getHello() {
    return 'Hello, World with service!';
  }
}
