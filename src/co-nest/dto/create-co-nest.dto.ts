import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCoNestDto {
    @ApiProperty({ description: 'The name of a drink'})
    @IsString() //untuk membaca inputan strings
    readonly name: string;

    @ApiProperty({ description: 'The name of a drink'})
    @IsString()
    readonly brand: string;

    @ApiProperty({ example: [] })
    @IsString({each: true})
    readonly flavors: string[];

}
