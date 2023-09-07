/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Login {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  count: number;

  @CreateDateColumn()
  created_at: Date;
}
