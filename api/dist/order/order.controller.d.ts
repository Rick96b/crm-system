import { OrderService } from './order.service';
import { OrderDto } from './order.interface';
export declare class OrderController {
    private readonly _orderService;
    constructor(_orderService: OrderService);
    getOrderById(id: number): Promise<import("./order.interface").OrderOutDto>;
    postOrder(order: OrderDto): Promise<void>;
    getAllOrders(): Promise<import("./order.interface").OrderOutDto[]>;
}
