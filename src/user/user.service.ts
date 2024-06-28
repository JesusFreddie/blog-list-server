import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/account/account.service';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  private readonly user = this.db.user;

  constructor(
		private readonly db: DbService,
		private readonly accountService: AccountService
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
		
		await this.accountService.create(user.id)

		return user;
	}
}
