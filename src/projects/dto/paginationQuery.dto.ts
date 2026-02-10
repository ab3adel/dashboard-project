import { Type } from "class-transformer";
import { IsDate, IsDateString, IsEnum, IsOptional, IsPositive } from "class-validator";
import { StatusEnum } from "../enums/projects.enums";
import { PaginationQueryDto } from "src/common/dto/paginationQuery.dto";




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