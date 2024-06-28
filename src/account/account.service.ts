import { Injectable } from '@nestjs/common';
import { PatchAccountDto } from './dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class AccountService {

	constructor(
		private readonly db: DbService,
	) {}

	async create(userId: number) {
		return this.db.account.create({
			data: {
				ownerId: userId,
				isBlockingEnabled: false
			}
		})
	}

	async getAccount(userId: number) {
		return await this.db.account.findFirstOrThrow({ where: { ownerId: userId } })
	}

	async patchAccount(userId: number, patch: PatchAccountDto) {
		return await this.db.account.update({
			where: { ownerId: userId },
			data: { ...patch }
		})
	}

}
