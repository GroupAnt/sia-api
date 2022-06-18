import { PartialType } from '@nestjs/mapped-types';
import { CreateTrashyDto } from './create-trashy.dto';

export class UpdateTrashyDto extends PartialType(CreateTrashyDto) {}
