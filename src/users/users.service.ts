import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, MoreThan } from 'typeorm';
import { User } from './entities/user.entity';
import { Login } from '../admin/entities/logins.entity';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';
import { Service } from '../services/entities/service.entity';
import { endOfYesterday, format } from 'date-fns';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    return this.usersRepository.save({ ...user, ...updateUserDto });
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async findOneByNIC(nic: string) {
    const user = await this.usersRepository.findOne({
      where: {
        nic_number: nic,
      },
    });

    const date_exist = await this.loginRepository.findOne({
      where: {
        date: format(new Date(), 'dd-LL-yyyy'),
      },
    });

    if (date_exist) {
      date_exist.count = date_exist.count + 1;
      await this.loginRepository.save(date_exist);
    } else {
      await this.loginRepository.save({
        date: format(new Date(), 'dd-LL-yyyy'),
        count: 1,
      });
    }

    user.updated_at = new Date();
    return this.usersRepository.save(user);
  }

  async updateOptions(id: string, updateUserServiceDto: UpdateUserServiceDto) {
    const services = await this.serviceRepository.find({
      where: {
        id: In(updateUserServiceDto.services),
      },
    });
    const user = await this.usersRepository.findOne({
      where: {
        nic_number: id,
      },
    });

    user.services = services;
    return this.usersRepository.save(user);
  }

  getAttendance() {
    return this.usersRepository.find({
      where: {
        updated_at: MoreThan(new Date(endOfYesterday())),
      },
    });
  }

  async groupByFaculty() {
    const science = await this.usersRepository.countBy({ faculty: 'science' });
    const arts = await this.usersRepository.countBy({ faculty: 'arts' });
    const management = await this.usersRepository.countBy({
      faculty: 'management',
    });
    const medicine = await this.usersRepository.countBy({
      faculty: 'medicine',
    });
    return {
      science,
      arts,
      management,
      medicine,
    };
  }

  async seed() {
    const users: CreateUserDto[] = [];

    try {
      for (let i = 0; i <= 10; i++) {
        users.push({
          user_name: faker.person.firstName(),
          index_number: faker.string.numeric({ length: 5 }),
          nic_number: faker.string.numeric({ length: 9 }),
          faculty: faker.helpers.arrayElement([
            'science',
            'arts',
            'management',
            'medicine',
          ]),
        });
      }
      const promises = users.map((user) => this.usersRepository.save(user));
      await Promise.all(promises);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
      };
    }
  }
}
