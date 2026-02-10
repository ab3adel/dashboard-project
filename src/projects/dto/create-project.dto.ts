import { IsArray, IsDate, IsInt, IsNumber, IsString } from "class-validator"


export class CreateProjectDto {
   @IsString()
   readonly name : string 

   @IsDate()
    readonly deadline : Date

    @IsNumber()
    readonly budget : number 

    @IsArray()
    @IsInt({each:true})
    readonly users: number []
     
     
}
