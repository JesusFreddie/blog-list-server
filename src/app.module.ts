import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { BlockListModule } from './block-list/block-list.module';

@Module({
  imports: [DbModule, AuthModule, UserModule, AccountModule, BlockListModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
