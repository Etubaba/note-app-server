import { Injectable, NotAcceptableException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto/createuser.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createAccount(userDto: UserDto) {
    const { email, full_name, password } = userDto;

    //check if email exist
    const emailExist = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExist) throw new NotAcceptableException('User Already exist');

    //hash password
    const hashedPassword = await argon2.hash(password);

    //create user
    await this.prismaService.user.create({
      data: { email, full_name, password: hashedPassword },
    });

    return { status: true, message: 'User Created successfull' };
  }
}
