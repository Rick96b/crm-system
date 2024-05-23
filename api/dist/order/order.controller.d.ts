import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getOrderById(id: number): Promise<{
        id: number;
    }>;
}
