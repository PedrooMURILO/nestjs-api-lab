import { Injectable } from '@nestjs/common';
import { MessagesEntity } from './messages-entity/messages-entity';
import { last } from 'rxjs';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: MessagesEntity[] = [
    {
      id: 1,
      text: 'This is a test',
      from: 'Pedro',
      for: 'Luiz',
      read: false,
      date: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findById(id: string) {
    return this.messages.find((item) => item.id === +id);
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  update(id: string, body: any) {
    const indexMessage = this.messages.findIndex((item) => item.id === +id);
    if (indexMessage >= 0) {
      const existingMessage = this.messages[indexMessage];

      this.messages[indexMessage] = {
        ...existingMessage,
        ...body,
      };
    }
  }

  remove(id: string) {
    const indexMessage = this.messages.findIndex((item) => item.id === +id);
    if (indexMessage >= 0) this.messages.splice(indexMessage, 1);
  }

  getHello() {
    return 'Hello, World with service!';
  }
}
