import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
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

    @Put('changeStatus')
    async changeStatus(@Body() dto: {orderId: string, newStatus: string}) {
        return this._orderService.changeStatus(dto.orderId, dto.newStatus)
    }
    
    @Get('getAll')
    async getAllOrders() {
        return this._orderService.getAllOrders();
    }
}
