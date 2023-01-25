import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/auth.dto';
import {
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common/exceptions';

require('dotenv').config();

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async userAuth(loginDto: LoginDto) {
    const { email, password }: LoginDto = loginDto;

    //validate email
    const theUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!theUser)
      throw new NotFoundException('This user does not exist on this platform');

    //chech password
    const isPasswordCorrect: boolean = await argon2.verify(
      theUser.password,
      password,
    );

    if (!isPasswordCorrect) {
      throw new NotAcceptableException(`User credentials is incorrect`);
    }

    //generate token
    const payload = { email: theUser.email, id: theUser.id };
    const token = this.jwtService.sign(payload);

    //delete password for safty
    delete theUser?.password;

    return {
      status: true,
      message: 'Login Successful',
      user: theUser,
      token: token,
    };
  }
}
