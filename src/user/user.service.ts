import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { BlockListService } from 'src/block-list/block-list.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  private readonly user = this.db.user;

  constructor(
		private readonly db: DbService,
		private readonly accountService: AccountService,
		private readonly blockListService: BlockListService
	) {}

  async findByEmail(email: string) {
    return await this.user.findFirst({ where: { email } });
  }

  async create(
    email: string,
    name: string,
    hash: string,
    salt: string,
  ) {
		const data = { email, name, hash, salt }
		const user = await this.user.create({data})
		
		await this.accountService.create(user.id);
		await this.blockListService.create(user.id)

		return user;
	}
}
