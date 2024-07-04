import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DbModule } from 'src/db/db.module';
import { AccountModule } from 'src/account/account.module';
import { BlockListModule } from 'src/block-list/block-list.module';

@Module({
	imports: [DbModule, AccountModule, BlockListModule],
  providers: [UserService],
	exports: [UserService]
})
export class UserModule {}
