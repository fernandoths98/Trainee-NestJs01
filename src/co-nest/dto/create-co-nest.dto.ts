import { IsString } from "class-validator";

export class CreateCoNestDto {
    @IsString() //untuk membaca inputan strings
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsString({each: true})
    readonly flavors: string[];

}
