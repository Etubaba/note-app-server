import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async userAuth(@Body() loginDto: LoginDto) {
    return await this.authService.userAuth(loginDto);
  }
}
