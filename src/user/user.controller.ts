
import { Req, Controller, Post, Body, HttpCode, HttpStatus, Res, UseGuards, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import type { Request, Response } from "express";
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayload } from 'src/auth/dto/user-dto';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: 'apicoder.duckdns.org',
    });
    return {
      success: true,
      message: 'Logout realizado com sucesso',
    };
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {

    await this.userService.create(createUserDto);

    return {
      success: true,
      message: 'Usuário criado com sucesso',
    };



  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {
    const token = await this.userService.authenticate(loginUserDto);

    res.cookie('auth-cookie', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hora
      sameSite: 'none',
    });

    return {
      success: true,
      message: 'Login realizado com sucesso',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: AuthenticatedRequest) {
    return {
      sucess: true,
      user: req.user,
    }
  }

}
