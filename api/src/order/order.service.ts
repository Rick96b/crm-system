import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderDto } from './order.interface';
import { PrismaService } from 'src/prisma.service';
import { Order, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class OrderService {
    constructor(private __prismaService: PrismaService) {}

    async getOrderById(_id: number): Promise<{ id: number }> {
        const order: Order = await this.__prismaService.order.findUnique({
            where: {
                id: _id
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

    async postNewOrder(_order: OrderDto) {
        const x = new Date().toISOString()
        const newEntry = await prisma.order.create({
            data: {
                title: _order.title,
                price: _order.price,
                status: _order.status,
                client: _order.client,
                dateOfCreation: _order.dateOfCreation,
                commentaries: _order.commentaries 
            }
        })
    }
}
