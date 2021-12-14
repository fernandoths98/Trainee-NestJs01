import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoNestModule } from './co-nest/co-nest.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoNestRatingModule } from './co-nest-rating/co-nest-rating.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [CoNestModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'nestjs',
    autoLoadEntities: true,
    synchronize: true
  }), CoNestRatingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
