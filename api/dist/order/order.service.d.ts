import { OrderDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private __prismaService;
    constructor(__prismaService: PrismaService);
    getOrderById(_id: number): Promise<{
        id: number;
    }>;
    postNewOrder(_order: OrderDto): Promise<void>;
}
