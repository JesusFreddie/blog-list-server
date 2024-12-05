import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { CookieService } from './cookie.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(
		private readonly jwtService: JwtService
	) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest() as Request;
		const token = req.cookies[CookieService.TokenKey];

		if (!token) {
			throw new UnauthorizedException();
		}

		try {
			const sessionInfo = this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
			req['session'] = sessionInfo;
		}
		catch {
			
		}

    return true;
  }
}
