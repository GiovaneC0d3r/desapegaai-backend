import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.URL_FRONTEND],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,

  })
  console.log('Frontend URL:', process.env.URL_FRONTEND);

  app.useGlobalPipes(new ValidationPipe(
    
    {
      whitelist: true,
      
    }
  ));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
