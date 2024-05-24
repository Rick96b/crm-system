import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './order.interface';

@Controller('order')
export class OrderController {
    constructor(private readonly _orderService: OrderService) {}

    @Get('getOrder/:id')
    async getOrderById(@Param('id', ParseIntPipe) id: number) {
        return this._orderService.getOrderById(id);
    }

    @Post('postOrder')
    async postOrder(@Body() order: OrderDto) {
        return this._orderService.postNewOrder(order)
    }
    
    @Get('getAll')
    async getAllOrders() {
        return this._orderService.getAllOrders();
    }
}
