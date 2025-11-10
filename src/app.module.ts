import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { MinioService } from './minio/minio.service';
import { MinioModule } from './minio/minio.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      dropSchema: true,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      password: String(process.env.POSTGRES_PASSWORD),
      username: process.env.POSTGRES_USER || 'admin',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
    }), AuthModule, UserModule, ProductsModule, MinioModule],
  controllers: [AppController],
  providers: [AppService, MinioService],
})
export class AppModule { }
