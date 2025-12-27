import { Controller, Get, Param } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @Get() // /messages/
  findAll() {
    return 'This route returns all messages.';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} message`;
  }
}
