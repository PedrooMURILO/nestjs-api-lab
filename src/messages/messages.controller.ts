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
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';

@Controller('messages')
@UseInterceptors(AddHeaderInterceptor)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get() // /messages/
  findAll(@Query() paginationDto: PaginationDto) {
    return this.messagesService.findAll(paginationDto);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.messagesService.findById(id);
  }

  @Post()
  create(@Body() createdMessageDto: CreateMessageDto) {
    return this.messagesService.create(createdMessageDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updatedMessageDto: UpdateMessageDto) {
    return this.messagesService.update(id, updatedMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.messagesService.remove(id);
  }
}
