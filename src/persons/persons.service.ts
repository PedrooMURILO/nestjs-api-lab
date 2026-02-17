import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };
      return this.personRepository.save(
        this.personRepository.create(personData),
      );
    } catch (error) {
      if (error.code === '23505')
        throw new ConflictException('E-mail already registered');
      throw error;
    }
  }

  async findAll() {
    const persons = await this.personRepository.find({
      order: {
        id: 'desc',
      },
    });
    return persons;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({
      where: {
        id,
      },
    });
    if (!person) throw new NotFoundException('Message not found');
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personData = {
      name: updatePersonDto?.name,
      passwordHash: updatePersonDto?.password,
    };

    const person = await this.personRepository.preload({
      id,
      ...personData,
    });

    if (!person) throw new NotFoundException('Person not found.');

    return this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({
      id,
    });
    if (!person) throw new NotFoundException('Person not found.');
    return this.personRepository.remove(person);
  }
}
