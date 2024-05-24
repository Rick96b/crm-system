import { OrderDto, OrderOutDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private _prismaService;
    constructor(_prismaService: PrismaService);
    getOrderById(id: number): Promise<OrderOutDto>;
    getAllOrders(): Promise<OrderOutDto[]>;
    postNewOrder(order: OrderDto): Promise<void>;
}
