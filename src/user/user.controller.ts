import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Controller('user')
@ApiTags('Authentication')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiCreatedResponse({ type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('users')
  @ApiOkResponse({ type: User, isArray: true })
  findAll() {
    return this.userService.findAll();
  }

  @Get('users/:id')
  @ApiOkResponse({ type: User })
  findOne(@Param('id') id: string) {
    return this.userService.findOneById(Number(id));
  }

  @Patch('users/:id')
  @ApiCreatedResponse({ type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+Number(id), updateUserDto);
  }
}
