import { CreateCoNestDto } from './create-co-nest.dto';
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCoNestDto extends PartialType(CreateCoNestDto) {
    //PartialType = untuk inject class dari createdCoNestDto
}
