import { IsArray, isArray, IsInt, IsNumber } from "class-validator";




export class AssignMemebersDto {
    @IsNumber()
    project_id: number
    
    @IsArray()
    @IsInt({each:true})
    users_ids : number[]
}


export class UpdateUserAssignment {
    @IsNumber()
    id : number 

     @IsNumber()
    user_id : number 

}