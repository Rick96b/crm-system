import { Controller, Post,Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from '../base/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signUp')
  @HttpCode(200)
  async signUp(@Body() dto: UserDto) {
    return this._authService.register(dto)
  }
  
  @Post('signIn')
  @HttpCode(200)
  async signIn(@Body() dto: UserDto) {
    return this._authService.login(dto);
  }

  @Post('authToken')
  @HttpCode(200)
  async authByToken(@Body() dto: {token: string}) {
    return this._authService.authByToken(dto.token);
  }

}