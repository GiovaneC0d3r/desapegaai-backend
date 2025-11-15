import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { AuthenticatedRequest } from 'src/user/user.controller';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Post('create')
  create(@Body() createProductDto: CreateProductDto, @Req() req: AuthenticatedRequest, @UploadedFiles() files: Express.Multer.File[]) {
    const userId = req.user.id as string;

    return this.productsService.create(createProductDto, userId, files);
  }


  @UseGuards(JwtAuthGuard)
  @Get('me')
  findMyProducts(@Req() req: AuthenticatedRequest) {
    const userId = req.user.id;
    return this.productsService.findByUser(userId);
  }


  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req: AuthenticatedRequest
  ) {
    const userId = req.user.id;
    return this.productsService.update(id, updateProductDto, files, userId);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
