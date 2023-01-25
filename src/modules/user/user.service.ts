import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/createuser.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(userDto: UserDto) {
    const { email, full_name, password } = userDto;
    const hashedPassword = await argon2.hash(password);
    await this.prismaService.user.create({
      data: { email, full_name, password: hashedPassword },
    });

    return { status: 'success', message: 'User Created successfull' };
  }
}
