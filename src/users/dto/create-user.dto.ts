import { IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  nic_number: string;

  @IsNotEmpty()
  @IsString()
  index_number: string;

  @IsNotEmpty()
  @IsString()
  faculty: string;
}
