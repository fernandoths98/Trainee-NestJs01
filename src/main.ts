import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { WrapResponseInterceptor } from './common/interceptors/wrap-response.interceptor';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
    const options = new DocumentBuilder() 
    .setTitle('Co-Nest')
    .setDescription('Drink Application')
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

  app.useGlobalInterceptors(
    new WrapResponseInterceptor(),
    new TimeoutInterceptor(),
    );
  // app.useGlobalGuards(new ApiKeyGuard());
  // app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
