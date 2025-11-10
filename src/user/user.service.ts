import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import * as argon2 from 'argon2';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async authenticate(loginUserDto: LoginUserDto): Promise<string> {
        const { email, password } = loginUserDto;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException('Email ou senha inválidos');

        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) throw new UnauthorizedException('Email ou senha inválidos');

        const payload = { sub: user.id, email: user.email, name: user.name || '' }
        return this.jwtService.sign(payload);

    }

    async create(
        createUserDto: CreateUserDto

    ): Promise<UserEntity> {
        const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
        if (existingUser) {
            throw new ConflictException('Email em uso!');
        }

        const userData = await this.userRepository.create(createUserDto);
        return this.userRepository.save(userData)
    }


}