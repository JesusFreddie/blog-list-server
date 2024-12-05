import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

abstract class SignUpAndSignInBodyDto {
	@IsNotEmpty()
	@IsEmail()
	@ApiProperty({
		example: "test@test.com"
	})
	email: string;

	@IsNotEmpty()
	@ApiProperty({
		example: "12345"
	})
	password: string;
}

export class SignUpBodyDto extends SignUpAndSignInBodyDto {

	@IsNotEmpty()
	@ApiProperty({
		example: "Constantine"
	})
	name: string;

}
export class SignInBodyDto extends SignUpAndSignInBodyDto {}

export class GetSessionInfoDto {
	@ApiProperty()
	id: number;

	@ApiProperty()
	email: string;
}