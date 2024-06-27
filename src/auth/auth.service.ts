import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { PasswordService } from './password.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
		private readonly passwordService: PasswordService,
		private readonly jwtSerice: JwtService
	) {}

	async signUp(email: string, password: string, name: string) {
		const user = await this.userService.findByEmail(email);
		
		if (user) {
			throw new BadRequestException({ type: 'email-exsist' })
		}

		var salt = this.passwordService.getSalt();
		var hash = this.passwordService.getHash(password, salt);

		var newUser = await this.userService.create(email, name, hash, salt);

		var payload = await this.jwtSerice.signAsync({ id: newUser.id, email: newUser.email, name: newUser.name });

		return { payload };
	}

	async signIn(email: string, password: string) {
		var user = await this.userService.findByEmail(email);
		
		if (!user) {
			throw new UnauthorizedException();
		}

		var hash = this.passwordService.getHash(password, user.salt);

		if (hash !== user.hash) {
			throw new UnauthorizedException();
		}

		var payload = await this.jwtSerice.signAsync({ id: user.id, email: user.email, name: user.name })

		return { payload }
	}

}
