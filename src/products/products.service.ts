import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { parsePriceToCents } from 'src/common/transformers/cents.transformer';
import { UserEntity } from 'src/user/entities/user.entity';
import { MinioService } from 'src/minio/minio.service';


@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly UserEntity: Repository<UserEntity>,
    private readonly minioService: MinioService,
  ) { }
  async create(
    createUserDto: CreateProductDto,
    userId: string,
    files: Express.Multer.File[]
  ): Promise<ProductEntity> {
    const user = await this.UserEntity.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const medias: string[] = [];
    for (const file of files) {
      const { fileUrl } = await this.minioService.uploadProductFile(file);
      medias.push(fileUrl);
    }
    const productData = await this.productRepository.create({
      ...createUserDto,
      price: parsePriceToCents(createUserDto.price),
      user: user,
      medias
    });
    return this.productRepository.save(productData)
  }

  findAll() {
    return `This action returns all products`;
  }

  async findByUser(userId: string): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      where: { user: { id: userId } },
    });

    return products;
  }


  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
