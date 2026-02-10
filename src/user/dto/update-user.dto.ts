
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../../enums/role.enum';

export class UpdateUserDto  {
    
    @IsOptional()
    @IsString()
    name:string 
     
    @IsOptional()
    @IsString()
    email:string
    
 

}

export class UpdateUserRoleDto  {
    
    @IsNumber()
    id :number
        
    @IsEnum(UserRole)
    role:UserRole

}

