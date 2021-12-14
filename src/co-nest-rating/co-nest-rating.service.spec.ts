import { Test, TestingModule } from '@nestjs/testing';
import { CoNestRatingService } from './co-nest-rating.service';

describe('CoNestRatingService', () => {
  let service: CoNestRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoNestRatingService],
    }).compile();

    service = module.get<CoNestRatingService>(CoNestRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
