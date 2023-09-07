import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Repository } from 'typeorm';
import { Login } from './entities/logins.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return this.loginRepository.save(createAdminDto);
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  async update(id: number, date: string) {
    const hit = await this.loginRepository.findOne({
      where: {
        date,
      },
    });
    hit.date = date;
    return this.loginRepository.save(hit);
  }

  remove(id: number) {
    return this.loginRepository.delete(id);
  }
  getLoginCount() {
    return this.loginRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
}
