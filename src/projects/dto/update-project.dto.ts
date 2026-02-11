import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/enums/projects.enums';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
    @IsOptional()
    @IsEnum(StatusEnum)
    status : StatusEnum
}
