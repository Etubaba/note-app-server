import { Controller, Post, Body, Param } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators';
import { UserDto } from './dto/createuser.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createAccount(userDto);
  }
  @Delete('/delete/:id')
  async deleteUser(@Param() id: string) {
    return await this.userService.deleteAccount(+id);
  }
}
