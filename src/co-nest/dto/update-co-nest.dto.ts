import { CreateCoNestDto } from './create-co-nest.dto';
import { PartialType } from "@nestjs/swagger";

export class UpdateCoNestDto extends PartialType(CreateCoNestDto) {
    //PartialType = untuk inject class dari createdCoNestDto
}
