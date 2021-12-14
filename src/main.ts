import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  //memhapus variable yang tidak berguna
      transform: true,
      forbidNonWhitelisted: true, //membaca variable yang tidak berguna dan membacanya sebagai error
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
    );
  await app.listen(3000);
}
bootstrap();
