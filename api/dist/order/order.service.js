"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
let OrderService = class OrderService {
    constructor(__prismaService) {
        this.__prismaService = __prismaService;
    }
    async getOrderById(_id) {
        const order = await this.__prismaService.order.findUnique({
            where: {
                id: _id
            }
        });
        if (!order) {
            throw new common_1.BadRequestException('Order with this ID doesn\'t exist');
        }
        let formattedCommentaries;
        order.commentaries.forEach((commentary) => {
            formattedCommentaries.push({ ...commentary, createdAt: new Date(commentary.createdAt) });
        });
        return { ...order, commentaries: formattedCommentaries };
    }
    async getAllOrder() {
        const orders = await prisma.order.findMany();
        let formattedOrders = [];
        let formattedCommentaries;
        orders.forEach(order => {
            order.commentaries.forEach((commentary) => {
                formattedCommentaries.push({ ...commentary, createdAt: new Date(commentary.createdAt) });
            });
            formattedOrders.push({ ...order, commentaries: formattedCommentaries });
        });
        return formattedOrders;
    }
    async postNewOrder(_order) {
        const x = new Date().toISOString();
        const newEntry = await prisma.order.create({
            data: {
                title: _order.title,
                price: _order.price,
                status: _order.status,
                client: _order.client,
                dateOfCreation: _order.dateOfCreation,
                commentaries: _order.commentaries
            }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map