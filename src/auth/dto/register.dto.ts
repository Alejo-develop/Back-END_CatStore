import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto {
    @Transform(({value}) => value.trim())
    @IsString()
    name?: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(8)
    password: string;
}
