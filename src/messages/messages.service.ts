import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesEntity } from './messages-entity/messages-entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(MessagesEntity)
    private readonly messageRepository: Repository<MessagesEntity>,
    private readonly personsService: PersonsService,
  ) {}

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

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdatedMessageDto = {
      read: updateMessageDto?.read,
      text: updateMessageDto?.text,
    };

    const message = await this.messageRepository.preload({
      id,
      ...partialUpdatedMessageDto,
    });

    if (!message) throw new NotFoundException('Message not found');
    return this.messageRepository.save(message);
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
