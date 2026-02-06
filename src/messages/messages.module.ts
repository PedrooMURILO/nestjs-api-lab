import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './messages-entity/messages-entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
