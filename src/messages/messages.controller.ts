import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @HttpCode(HttpStatus.OK)
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

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action deletes the message with id #${id}`;
  }
}
