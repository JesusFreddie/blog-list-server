import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AccountDto, PatchAccountDto } from './dto';
import { AccountService } from './account.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { SessionInfo } from 'src/auth/session-info.decorator';
import { GetSessionInfoDto } from 'src/auth/dto';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {

	constructor(
		private readonly accountService: AccountService
	) {}

	@Get()
	@ApiOkResponse({
		type: AccountDto
	})
	getAccount(@SessionInfo() sessionInfo: GetSessionInfoDto): Promise<AccountDto> {
		return this.accountService.getAccount(sessionInfo.id)
	}

	@Patch()
	@ApiOkResponse({
		type: PatchAccountDto
	})
	patchAccount(@Body() body: PatchAccountDto, @SessionInfo() sessionInfo: GetSessionInfoDto): Promise<PatchAccountDto> {
		return this.accountService.patchAccount(sessionInfo.id, body)
	}
}
