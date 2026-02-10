import { IsString, MinLength } from "class-validator"

export class CreateUserDto {

    @IsString()
    name : string 
    
    @MinLength(10)
    @IsString()
    password : string 

    @IsString()
    email :string

}
