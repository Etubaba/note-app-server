import { Controller, Post, Body } from '@nestjs/common';
import { UserDto } from './dto/createuser.dto';

import { UserService } from './user.service';

@Controller('create')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/account')
  async createUser(@Body() userDto: UserDto) {
    return await this.userService.createAccount(userDto);
  }
}
