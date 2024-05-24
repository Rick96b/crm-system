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
let OrderService = class OrderService {
    constructor(_prismaService) {
        this._prismaService = _prismaService;
    }
    async getOrderById(id) {
        const order = await this._prismaService.order.findUnique({
            where: {
                id: id
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
    async getAllOrders() {
        const orders = await this._prismaService.order.findMany();
        let formattedOrders = [];
        orders.forEach(order => {
            let formattedCommentaries;
            order.commentaries.forEach((commentary) => {
                formattedCommentaries.push({ ...commentary, createdAt: new Date(commentary.createdAt) });
            });
            formattedOrders.push({ ...order, commentaries: formattedCommentaries });
        });
        return formattedOrders;
    }
    async postNewOrder(order) {
        let formattedCommentaries;
        order.commentaries.forEach(commentary => {
            formattedCommentaries.push({ ...commentary, createdAt: commentary.createdAt.toISOString() });
        });
        const newEntry = await this._prismaService.order.create({
            data: { ...order, commentaries: formattedCommentaries }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map