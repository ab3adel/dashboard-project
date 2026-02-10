import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import type { StatusEnum } from "../enums/projects.enums"
import { User } from "src/user/entities/user.entity"

//(e.g. “active”, “on hold”, “completed”)
export class Project {

    @PrimaryGeneratedColumn()  
    id : number 

    @Column()
    name :string

    @Column()
    status :StatusEnum

    @Column()
    deadline: Date 

    @Column()
    budget:number

    @JoinTable()
    @ManyToMany(type=>User
                ,(user)=>user.projects
                ,{
                    cascade:true
                }
            )
    users: User [] 


}
