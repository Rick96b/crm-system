import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';

@Module({
  providers: [
    AuthService,
    PrismaService
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'Secret',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ]
})
export class AuthModule {}