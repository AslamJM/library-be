import { Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from './entities/feedback.entity';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(nic_number: string, createFeedbackDto: CreateFeedbackDto) {
    try {
      const user = await this.userRepository.findOne({ where: { nic_number } });
      if (!user) {
        throw new Error('User not found');
      }

      return this.feedbackRepository.save({ ...createFeedbackDto, user });
    } catch (error) {
      return error;
    }
  }

  findAll() {
    return this.feedbackRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.feedbackRepository.findOne({ where: { id } });
    return this.userRepository.save({ ...feedback, ...updateFeedbackDto });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
