import { LoggingMiddleware } from './middleware/logging.middleware';
import { ApiKeyGuard } from './guards/api-key.guard';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({ 
  imports: [ConfigModule],
  providers: [{provide: APP_GUARD, useClass: ApiKeyGuard}],
 })
export class CommonModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
