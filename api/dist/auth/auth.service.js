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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon2 = require("argon2");
const prisma_service_1 = require("../prisma.service");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(_prismaService, _jwtService) {
        this._prismaService = _prismaService;
        this._jwtService = _jwtService;
    }
    async login(dto) {
        const user = await this.validateUser(dto);
        return await this.generateToken(user);
    }
    async validateUser(dto) {
        console.log(dto);
        const user = await this._prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'Incorrect email or password'
            });
        }
        const passwordEquals = await argon2.verify(user.password, dto.password);
        if (!passwordEquals) {
            throw new common_1.UnauthorizedException({
                message: 'Incorrect email or password'
            });
        }
        return user;
    }
    async register(dto) {
        console.log(dto);
        const oldUser = await this._prismaService.user.findUnique({
            where: {
                email: dto.email
            }
        });
        if (oldUser) {
            throw new common_1.BadRequestException('User already exist');
        }
        const user = await this._prismaService.user.create({
            data: { ...dto, password: await argon2.hash(dto.password) }
        });
        return await this.generateToken(user);
    }
    async generateToken(user) {
        const payload = { email: user.email, id: user.id };
        return {
            token: this._jwtService.sign(payload)
        };
    }
    async authByToken(token) {
        const decodedJwtToken = this._jwtService.decode(token);
        const user = await this._prismaService.user.findUnique({
            where: {
                id: decodedJwtToken.id
            }
        });
        if (!user) {
            throw new common_1.UnauthorizedException({
                message: 'Incorrect Access Token'
            });
        }
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map