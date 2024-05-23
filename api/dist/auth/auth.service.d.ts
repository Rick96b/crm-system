import { UserDto } from '../base/interfaces';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private _prismaService;
    private _jwtService;
    constructor(_prismaService: PrismaService, _jwtService: JwtService);
    login(dto: UserDto): Promise<{
        token: string;
    }>;
    private validateUser;
    register(dto: UserDto): Promise<{
        token: string;
    }>;
    private generateToken;
    authByToken(token: string): Promise<UserDto>;
}
