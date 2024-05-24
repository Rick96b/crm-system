import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto, OrderOutDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
import { Order, PrismaClient } from '@prisma/client';

@Injectable()
export class OrderService {
    constructor(private _prismaService: PrismaService) {}

    async getOrderById(id: number): Promise<OrderOutDto> {
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

        return {...order, commentaries: formattedCommentaries}
    }

    async getAllOrders(): Promise<OrderOutDto[]> {
        const orders: Order[] = await this._prismaService.order.findMany();
        let formattedOrders: OrderOutDto[] = [];
        
        orders.forEach(order => {
            let formattedCommentaries: {text: string, createdAt: Date}[];
            order.commentaries.forEach((commentary: {text: string, createdAt: string}) => {
                formattedCommentaries.push({...commentary, createdAt: new Date(commentary.createdAt)});
            }) 
            formattedOrders.push({...order, commentaries: formattedCommentaries});   
        });

        return formattedOrders;
    }

    async postNewOrder(order: OrderDto) {
        console.log(order)
        let formattedCommentaries: {text: string, createdAt: string}[] = []
        if(order.commentaries) {
            order.commentaries.forEach(commentary => {
                formattedCommentaries.push({...commentary, createdAt: commentary.createdAt.toISOString()})
            })
        }


        const newEntry = await this._prismaService.order.create({
            data: {...order, commentaries: formattedCommentaries}
        })
    }

    async changeStatus(id: string, newStatus: string) {
        return await this._prismaService.order.update({
            where: {
                id: +id
            },
            data: {
                status: newStatus
            }
        })
    }
}
