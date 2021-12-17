import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoNestModule } from './co-nest/co-nest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoNestRatingModule } from './co-nest-rating/co-nest-rating.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ConfigModule.forRoot(),
    CoNestModule,
    CoNestRatingModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
