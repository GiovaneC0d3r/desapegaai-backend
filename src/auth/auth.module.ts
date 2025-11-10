import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtCookieStrategy } from './strategies/jwt-cookie.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [JwtCookieStrategy],
  exports: [JwtModule],
})
export class AuthModule {}