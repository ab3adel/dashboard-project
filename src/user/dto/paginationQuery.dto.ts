
import { IsEnum, IsOptional } from "class-validator";
import { PaginationQueryDto } from "../../common/dto/paginationQuery.dto";

import { UserRole } from "../../enums/role.enum";




export class UserPaginationQueryDto extends PaginationQueryDto{
 

   @IsOptional()
  @IsEnum(UserRole)
  status?: UserRole;
}