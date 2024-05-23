import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UserDto } from '../base/interfaces';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';


@Injectable()
export class AuthService {
  constructor(private _prismaService: PrismaService, private _jwtService: JwtService) {
  }

  async login(dto: UserDto): Promise<{ token: string }> {
    const user: User = await this.validateUser(dto);
    return await this.generateToken(user);
  }

  private async validateUser(dto: UserDto) {
    console.log(dto)
    const user = await this._prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if(!user) {
      throw new UnauthorizedException({
        message: 'Incorrect email or password'
      });
    }

    const passwordEquals: boolean = await argon2.verify(user.password, dto.password);

    if (!passwordEquals) {  
      throw new UnauthorizedException({
        message: 'Incorrect email or password'
      });
    }
    return user
  }
  async register(dto: UserDto): Promise<{ token: string }> {
    console.log(dto);
    const oldUser: User | null = await this._prismaService.user.findUnique({
      where: {
        email: dto.email
      }
    });

    if (oldUser) {
      throw new BadRequestException('User already exist');
    }

    const user: User = await this._prismaService.user.create({
      data: { ...dto, password: await argon2.hash(dto.password) }
    });

    return await this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ token: string }> {
    const payload = { email: user.email, id: user.id };
    return {
      token: this._jwtService.sign(payload)
    };
  }

  async authByToken(token: string): Promise<UserDto> {
    const decodedJwtToken: { email: string, id: number } = this._jwtService.decode(token);
    
    const user = await this._prismaService.user.findUnique({
      where: {
        id: decodedJwtToken.id
      }
    });

    if(!user) {
      throw new UnauthorizedException({
        message: 'Incorrect Access Token'
      });
    }
    return user;
  }
}