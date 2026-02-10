import { Type } from "class-transformer";
import { IsEnum, IsOptional, IsPositive } from "class-validator";

import { PaginationQueryDto } from "src/common/dto/paginationQuery.dto";
import { UserRole } from "../enums/role.enum";




export class UserPaginationQueryDto extends PaginationQueryDto{
 

   @IsOptional()
  @IsEnum(UserRole)
  status?: UserRole;
}