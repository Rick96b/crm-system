import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private _jwtService: JwtService) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader: string | null = req.headers.authorization;
      const bearer: string = authHeader.split(' ')[0];
      const token: string = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
      }
      req.user = this._jwtService.verify(token);
      return true;

    } catch (e) {
      throw new UnauthorizedException({ message: 'Пользователь не авторизован' });
    }

  }
}