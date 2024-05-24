import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('getOrder/:id')
    async getOrderById(@Param('id', ParseIntPipe) id: number) {
        return this.orderService.getOrderById(id);
    }
    
    @Get('getAll')
    async getAllOrders() {
        return this.orderService.getAllOrders();
    }
}
