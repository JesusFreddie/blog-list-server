import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class UserService {
  private readonly user = this.db.user;

  constructor(private readonly db: DbService) {}

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
		return this.user.create({data})
	}
}
