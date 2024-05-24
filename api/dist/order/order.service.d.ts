import { OrderDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private __prismaService;
    constructor(__prismaService: PrismaService);
    getOrderById(_id: number): Promise<{
        id: number;
    }>;
    getAllOrder(): Promise<{
        orders: OrderDto[];
    }>;
    postNewOrder(_order: OrderDto): Promise<void>;
}
