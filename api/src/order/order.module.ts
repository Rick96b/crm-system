import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [OrderService, PrismaService],
})
export class OrderModule {}
