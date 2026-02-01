import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  getHello() {
    return 'Hello, World with service!';
  }
}
