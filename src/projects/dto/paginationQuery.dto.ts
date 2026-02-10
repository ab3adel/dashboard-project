import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";
import { StatusEnum } from "../enums/projects.enums";




export class PaginationQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  limit: number;

  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;

   @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}