import {
    IsEmail,
    IsOptional,
    IsString,
    IsNotEmpty,
    MinLength,
    MaxLength

} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    @MaxLength(8, { message: 'A senha deve ter no máximo 8 caracteres' })
    password: string
}