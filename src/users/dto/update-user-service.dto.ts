/* eslint-disable prettier/prettier */
import { IsArray } from 'class-validator';

export class UpdateUserServiceDto {
  @IsArray()
  services: number[];
}
