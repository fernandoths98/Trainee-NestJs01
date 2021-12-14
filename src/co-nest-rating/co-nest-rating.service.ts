import { ServiceNest } from './../co-nest/co-nest.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoNestRatingService {
    constructor(private readonly coNestService: ServiceNest){
        
    }
}
