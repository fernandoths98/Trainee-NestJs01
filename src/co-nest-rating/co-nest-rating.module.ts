import { DatabaseModule } from './../database/database.module';
import { CoNestModule } from './../co-nest/co-nest.module';
import { Module } from '@nestjs/common';
import { CoNestRatingService } from './co-nest-rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nestjs',
        autoLoadEntities: true,
        synchronize: true
    }),
    CoNestModule],
  providers: [CoNestRatingService],
})
export class CoNestRatingModule {}
