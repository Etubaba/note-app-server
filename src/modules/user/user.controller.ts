import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserDto } from './dto/createuser.dto';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createAccount(userDto);
  }
  @Post('/delete/:id')
  async deleteUser(@Param() id: string) {
    return await this.userService.deleteAccount(+id);
  }
}
