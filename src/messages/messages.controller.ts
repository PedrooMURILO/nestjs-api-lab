import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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

  @Get(':name/:id')
  findOneAndName(@Param('id') id: string, @Param('name') name: string) {
    return `This action returns a #${id} message from ${name}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }
}
