import { IsEmail } from 'class-validator';
import { MessagesEntity } from 'src/messages/messages-entity/messages-entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 255 })
  passwordHash: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @OneToMany(() => MessagesEntity, (MessagesEntity) => MessagesEntity.from)
  sendedMessages: MessagesEntity[];

  @OneToMany(() => MessagesEntity, (MessagesEntity) => MessagesEntity.to)
  receivedMessages: MessagesEntity[];
}
