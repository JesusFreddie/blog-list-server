import { BadRequestException, Injectable } from '@nestjs/common';
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
		var user = await this.userService.findByEmail(email);
		
		if (user) {
			throw new BadRequestException({ type: 'email-exsist' })
		}

		var salt = this.passwordService.getSalt();
		var hash = this.passwordService.getHash(password, salt);

		const newUser = await this.userService.create(email, name, hash, salt);

		const payload = await this.jwtSerice.signAsync({ id: newUser.id, email: newUser.email, name: newUser.name });

		return { payload };
	}

	signIn(email: string, password: string) {}

}
