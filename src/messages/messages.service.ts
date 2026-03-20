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
    const messages = await this.messageRepository.find({
      relations: ['from', 'to'],
      order: { id: 'desc' },
      select: { from: { id: true, name: true }, to: { id: true, name: true } },
    });
    return messages;
  }

  async findById(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: ['from', 'to'],
      select: { from: { id: true, name: true }, to: { id: true, name: true } },
    });
    if (message) return message;
    throw new NotFoundException('Message not found');
  }

  async create(createdMessageDto: CreateMessageDto) {
    const { fromId, toId } = createdMessageDto;
    const from = await this.personsService.findOne(fromId);
    const to = await this.personsService.findOne(toId);

    const newMessage = {
      text: createdMessageDto.text,
      from,
      to,
      read: false,
      date: new Date(),
    };

    await this.messageRepository.save(
      this.messageRepository.create(newMessage),
    );

    return {
      ...newMessage,
      from: { id: newMessage.from.id },
      to: { id: newMessage.to.id },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.findById(id);

    message.text = updateMessageDto?.text ?? message.text;
    message.read = updateMessageDto?.read ?? message.read;

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
