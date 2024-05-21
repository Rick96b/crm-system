import { AuthService } from './auth.service';
import { UserDto } from '../base/interfaces';
export declare class AuthController {
    private _authService;
    constructor(_authService: AuthService);
    signUp(dto: UserDto): Promise<{
        token: string;
    }>;
    signIn(dto: UserDto): Promise<{
        token: string;
    }>;
}
