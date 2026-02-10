import { IsArray, isArray, IsInt, IsNumber } from "class-validator";




export class AssignMemebersDto {
    @IsNumber()
    project_id: number
    
    @IsArray()
    @IsInt({each:true})
    users_ids : number[]
}