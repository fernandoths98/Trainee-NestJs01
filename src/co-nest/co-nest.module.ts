import { Event } from './../events/entities/event.entity';
import { Flavor } from './entities/flavor.entity';
import { Nest } from './entities/nest.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceNest } from './co-nest.service';
import { CoNestController } from './co-nest.controller';
import { Injectable, Module } from '@nestjs/common';
import { DRINK_BRANDS } from './co-nest.constants';
import { async } from 'rxjs';
import { Connection } from 'typeorm';

// class MockNestService {}
// class ConfigService {}
// class DevelopmentConfigService{}
// class ProductionConfigService{}

// @Injectable()
// export class NestBrandsFactory {
//     create() {
//         return ['buddy brew', 'nescafe'];
//     }
// }

//sebagai penghubung antara controller dengan service
@Module({ 
    imports: [TypeOrmModule.forFeature([Nest, Flavor, Event])], //import entity dari class nest
    controllers: [CoNestController], 
    // providers: [{provide: ServiceNest, useValue: new MockNestService()}],
    providers: [ServiceNest,
    //     {
    //     provide: ConfigService,
    //     useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService: ProductionConfigService,
    // },
        {
        provide: DRINK_BRANDS, useFactory: async (connection: Connection): Promise<string[]> => {
            const drinkBrands = await Promise.resolve(['buddy brew', 'nescafe']);
            console.log('[!] Async factory');
            return drinkBrands;
        },
        inject: [Connection],
    },
    ],
    exports: [ServiceNest],
}) // service
export class CoNestModule {}
