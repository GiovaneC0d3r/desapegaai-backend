// minio.service.ts
import { Injectable } from '@nestjs/common';
import { Client } from 'minio';
import { extname } from 'path';
import { randomUUID } from 'crypto';
@Injectable()
export class MinioService {
  private client: Client;

  constructor() {
    this.client = new Client({
      endPoint: process.env.MINIO_ENDPOINT || 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: process.env.MINIO_USER,
      secretKey: process.env.MINIO_PASSWORD
    });
  }

  async uploadProductFile(file: Express.Multer.File) {
    const bucket = 'desapegaai';
    const filename = `${randomUUID()}${extname(file.originalname)}`;
    const objectName = `products/${filename}`;
    await this.client.putObject(bucket, objectName, file.buffer);
    return { fileUrl: `https://${process.env.MINIO_ENDPOINT}/${bucket}/${objectName}` };
  }
}
