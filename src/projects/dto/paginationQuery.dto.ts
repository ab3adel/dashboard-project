
import {IsDateString, IsEnum, IsOptional } from "class-validator";
import { StatusEnum } from "../../enums/projects.enums";
import { PaginationQueryDto } from "../../common/dto/paginationQuery.dto";




export class ProjectPaginationQueryDto extends PaginationQueryDto{
 

   @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;


  @IsOptional()
  @IsDateString()
  deadlineFrom?: string;

  @IsOptional()
  @IsDateString()
  deadlineTo?: string
}