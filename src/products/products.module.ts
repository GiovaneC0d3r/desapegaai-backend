import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import {JwtModule} from '@nestjs/jwt'
import { UserEntity } from 'src/user/entities/user.entity';
import { MinioModule } from 'src/minio/minio.module';
@Module({
  imports:[
    TypeOrmModule.forFeature([ProductEntity, UserEntity]),
    MinioModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
