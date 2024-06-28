import { ApiProperty } from "@nestjs/swagger";

abstract class SignUpAndSignInBodyDto {
	@ApiProperty({
		example: "test@test.com"
	})
	email: string;

	@ApiProperty({
		example: "Constantine"
	})
	name: string;

	@ApiProperty({
		example: "12345"
	})
	password: string;
}

export class SignUpBodyDto extends SignUpAndSignInBodyDto {}
export class SignInBodyDto extends SignUpAndSignInBodyDto {}

export class GetSessionInfoDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	email: string;
}