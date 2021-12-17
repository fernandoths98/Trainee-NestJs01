import { CoNestModule } from './../co-nest/co-nest.module';
import { Module } from '@nestjs/common';
import { CoNestRatingService } from './co-nest-rating.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoNestModule],
  providers: [CoNestRatingService],
})
export class CoNestRatingModule {}
