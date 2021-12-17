import { Flavor } from './entities/flavor.entity';
import { UpdateCoNestDto } from './dto/update-co-nest.dto';
import { CreateCoNestDto } from './dto/create-co-nest.dto';
import { Nest } from './entities/nest.entity';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { DRINK_BRANDS } from './co-nest.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import drinkConfig from './config/co-nest.config';

//sebagai tempat logic pada controller
@Injectable()
export class ServiceNest {
    constructor(
        @InjectRepository(Nest)
        private readonly nestRepository: Repository<Nest>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection,
        @Inject(drinkConfig.KEY)
        private readonly drinkConfiguration: ConfigType<typeof drinkConfig>,
    ) {
        console.log(drinkConfiguration.foo);
        //console.log(drinkBrands);
    }

    findAll(paginationQuery: PaginationQueryDto) { //logic untuk mengambil data keseluruhan
        const { limit, offset } = paginationQuery;
        return this.nestRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit,
        });
    }

    async findOne(id: string) { //Logic untuk mengambil data berdasarkan id yang diinginkan
        //throw 'A Random Error Message'; // pesan error default ketika user tidak ditemukan pada terminal
        const nest = await this.nestRepository.findOne(id,
            {
                relations: ['flavors'],
            }
        );
        //const nest =  this.nest.find(item => item.id === +id);
        if (!nest) {
            throw new NotFoundException(`Coffee #${id} not found`); //Pesan error ketika user tidak ditemukan
        }

        return nest;
    }

    async create(createNestDto: CreateCoNestDto) { //Logic untuk menginpt data baru kedalam database
        const flavors = await Promise.all(
            createNestDto.flavors.map(name => this.preloadFlavorByName(name)),
        );

        const nest = this.nestRepository.create({
            ...createNestDto,
            flavors,
        })
        return this.nestRepository.save(nest);



    }

    async update(id: string, updateNestDto: UpdateCoNestDto) { //logic untuk mengrubah data
        const flavors = updateNestDto.flavors && (await Promise.all(
            updateNestDto.flavors.map(name => this.preloadFlavorByName(name)),
        ));

        const nest = await this.nestRepository.preload({
            id: +id,
            ...updateNestDto,
            flavors
        });

        if (!nest) {
            throw new NotFoundException(`Name #${id} not found`);
        }
        return this.nestRepository.save(nest);
    }

    async remove(id: string) { //Logic untuk menghapus database berdasarkan id
        const nest = await this.findOne(id);
        return this.nestRepository.remove(nest)
    }

    async recommendNest(nest: Nest) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            nest.recommendations++;

            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_nest';
            recommendEvent.type = 'nest';
            recommendEvent.payload = { nestId: nest.id };

            await queryRunner.manager.save(nest);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }

        return this.flavorRepository.create({ name });
    }

}
