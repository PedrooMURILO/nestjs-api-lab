import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './messages-entity/messages-entity';
import { PersonsModule } from 'src/persons/persons.module';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity]), PersonsModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
