import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordService } from './password.service';
import { CookieService } from './cookie.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordService, CookieService]
})
export class AuthModule {}
