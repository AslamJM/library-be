import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserServiceDto } from './dto/update-user-service.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/attendance')
  getAttendance() {
    return this.usersService.getAttendance();
  }

  @Get('/faculty')
  groupByFaculty() {
    return this.usersService.groupByFaculty();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('/nic/:nic')
  findByNIC(@Param('nic') nic: string) {
    return this.usersService.findOneByNIC(nic);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Patch('/options/:id')
  updateOptions(
    @Param('id') id: string,
    @Body() updateUserServiceDto: UpdateUserServiceDto,
  ) {
    return this.usersService.updateOptions(id, updateUserServiceDto);
  }
}
