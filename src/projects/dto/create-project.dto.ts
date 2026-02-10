import { IsArray, IsDate, IsInt, IsNumber, IsOptional, IsString } from "class-validator"


export class CreateProjectDto {
   @IsString()
   readonly name : string 

   @IsDate()
    readonly deadline : Date

    @IsNumber()
    readonly budget : number 

    @IsOptional()
    @IsArray()
    @IsInt({each:true})
    readonly users?: number []
     
     
}
