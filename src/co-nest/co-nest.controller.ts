import { ParseIntPipe } from './../common/pipes/parse-int.pipe';
import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { UpdateCoNestDto } from './dto/update-co-nest.dto';
import { CreateCoNestDto } from './dto/create-co-nest.dto';
import { ServiceNest } from './co-nest.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, SetMetadata } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { resolve } from 'path';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('co-nest')
@Controller('co-nest')
export class CoNestController {
    constructor(private readonly nestService: ServiceNest) {}

    
    @Public()
    @Get() // untuk mengambil data keseluruhan
    async findAll(@Protocol('https') protocol: string, 
    @Query() paginationQuery: PaginationQueryDto) {
        console.log(protocol);
        //await new Promise(resolve => setTimeout(resolve, 5000));
        return this.nestService.findAll(paginationQuery);
        // const {limit, offset } = paginationQuery;
        // return `This action returns all coffee. Limit: ${limit}, Offset: ${offset}`;
    }

    @Get(':id') // untuk mengambil data berdasarkan id yang diinginkan
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log(id);
        //console.log(typeof id)
        return this.nestService.findOne('' + id);
        //return `This action returns #${id} coffee`;
    }

    @Post() // untuk menginput data
    create(@Body() createdNestDto: CreateCoNestDto) {
        console.log(createdNestDto instanceof CreateCoNestDto)
        return this.nestService.create(createdNestDto);
    }

    @Patch(':id') // untuk merubah data berdasarkan id yang diinginkan
    update(@Param('id') id: string, @Body() updateNestDto: UpdateCoNestDto) {
        return this.nestService.update(id, updateNestDto);
        //return `This action update #${id} coffee`;
    }

    @Delete(':id') //untuk menghapus data berdasarkan id yang diinginkan
    remove(@Param('id') id: string) {
        return this.nestService.remove(id);
        //return `This action removes #${id} coffeee`;
    }
}
