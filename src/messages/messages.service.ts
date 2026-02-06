import { Injectable, NotFoundException } from '@nestjs/common';
import { MessagesEntity } from './messages-entity/messages-entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
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

  findAll() {
    return this.messages;
  }

  findById(id: number) {
    const message = this.messages.find((item) => item.id === +id);
    if (message) return message;
    throw new NotFoundException('Message not found');
  }

  create(createdMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createdMessageDto,
      read: false,
      date: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
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

  remove(id: number) {
    const indexMessage = this.messages.findIndex((item) => item.id === id);
    if (indexMessage < 0) throw new NotFoundException('Message not found');
    if (indexMessage >= 0) this.messages.splice(indexMessage, 1);
    return 'Message deleted';
  }

  getHello() {
    return 'Hello, World with service!';
  }
}
