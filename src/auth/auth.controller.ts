import { Body, Controller, Get, Head, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from './dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from "express"
import { CookieService } from './cookie.service';
import { AuthGuard } from './auth.guard';
import { SessionInfo } from './session-info.decorator';

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
	public async signIn(@Body() body: SignInBodyDto, @Res({ passthrough: true }) res: Response) {
		const { payload } = await this.authService.signIn(body.email, body.password);

		this.cookieService.setToken(res, payload);
	}

	@Post("sign-out")
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiOkResponse()
	public singOut(@Res({ passthrough: true }) res: Response) {
		this.cookieService.removeToken(res)
	}

	@Get("session")
	@HttpCode(HttpStatus.OK)
	@UseGuards(AuthGuard)
	@ApiOkResponse({
		type: GetSessionInfoDto
	})
	public getSessionInfo(@SessionInfo() sessionInfo: GetSessionInfoDto) {
		return sessionInfo;
	}

}
