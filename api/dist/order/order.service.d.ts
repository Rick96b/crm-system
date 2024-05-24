import { OrderDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private _prismaService;
    constructor(_prismaService: PrismaService);
    getOrderById(id: number): Promise<{
        id: number;
    }>;
    getAllOrder(): Promise<OrderDto[]>;
    postNewOrder(order: OrderDto): Promise<void>;
}
