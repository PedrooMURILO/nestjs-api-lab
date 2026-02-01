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
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get() // /messages/
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    // return `This route returns all messages. Limit = ${limit}, Offfset = ${offset}`;
    return this.messagesService.getHello();
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
