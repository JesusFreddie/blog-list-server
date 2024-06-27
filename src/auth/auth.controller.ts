import { Body, Controller, Get, Head, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from "express"
import { CookieService } from './cookie.service';

@Controller('auth')
export class AuthController {

	constructor(
		private readonly authService: AuthService,
		private readonly cookieService: CookieService
	) {}

	@Post("sign-up")
	@HttpCode(HttpStatus.CREATED)
	@ApiCreatedResponse()
	public async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) {
		const { payload } = await this.authService.signUp(body.email, body.password, body.name);

		this.cookieService.setToken(res, payload);
	}

	@Post("sign-in")
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse()
	public signIn(@Body() body: SignInBodyDto) {
		return null;
	}

	@Post("sign-out")
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse()
	public singOut() {
		return null;
	}

	@Get("session")
	@HttpCode(HttpStatus.OK)
	@ApiOkResponse({
		type: GetSessionInfoDto
	})
	public getSessionInfo() {
		return null;
	}

}
