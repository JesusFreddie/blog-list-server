import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from 'src/db/db.module';
import { AccountModule } from 'src/account/account.module';

@Module({
	imports: [DbModule, AccountModule],
  providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
