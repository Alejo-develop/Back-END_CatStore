import { IsInt, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateCatDto {
    @IsString()
    @MinLength(3)
    name: string;

    @IsInt()
    @IsPositive()
    age: number;

    @IsString()
    @MinLength(5)
    @IsOptional()
    breed: string;

}
