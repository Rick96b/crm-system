import { OrderService } from './order.service';
import { OrderDto } from './order.interface';
export declare class OrderController {
    private readonly _orderService;
    constructor(_orderService: OrderService);
    getOrderById(id: number): Promise<import("./order.interface").OrderOutDto>;
    postOrder(order: OrderDto): Promise<void>;
    changeStatus(dto: {
        orderId: string;
        newStatus: string;
    }): Promise<{
        id: number;
        title: string;
        price: number;
        status: string;
        client: string;
        dateOfCreation: Date;
        commentaries: import(".prisma/client").Prisma.JsonValue[];
    }>;
    getAllOrders(): Promise<import("./order.interface").OrderOutDto[]>;
}
