import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
import { Order, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class OrderService {
    constructor(private _prismaService: PrismaService) {}

    async getOrderById(id: number): Promise<{ id: number }> {
        const order: Order = await this._prismaService.order.findUnique({
            where: {
                id: id
            }
        });

        if(!order) {
            throw new BadRequestException( 'Order with this ID doesn\'t exist')
        }

        let formattedCommentaries: {text: string, createdAt: Date}[]
        order.commentaries.forEach((commentary: {text: string, createdAt: string}) => {
            formattedCommentaries.push({...commentary, createdAt: new Date(commentary.createdAt)})
        })

        return {...order, commentaries: formattedCommentaries} as OrderDto
    }

    async getAllOrder(): Promise<OrderDto[]> {
        const orders: Order[] = await prisma.order.findMany();
        let formattedOrders: OrderDto[] = [];
        
        orders.forEach(order => {
            let formattedCommentaries: {text: string, createdAt: Date}[];
            order.commentaries.forEach((commentary: {text: string, createdAt: string}) => {
                formattedCommentaries.push({...commentary, createdAt: new Date(commentary.createdAt)});
            }) 
            formattedOrders.push({...order, commentaries: formattedCommentaries});   
        });

        return formattedOrders as OrderDto[];
    }

    async postNewOrder(order: OrderDto) {
        let formattedCommentaries: {text: string, createdAt: string}[]
        order.commentaries.forEach(commentary => {
            formattedCommentaries.push({...commentary, createdAt: commentary.createdAt.toISOString()})
        })

        const newEntry = await prisma.order.create({
            data: {...order, commentaries: formattedCommentaries}
        })
    }
}
