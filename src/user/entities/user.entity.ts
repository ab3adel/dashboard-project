import { Project } from "src/projects/entities/project.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


export class User {

  @PrimaryGeneratedColumn()
  id:number

  @Column() 
  name:string  
  
  @Column()
  email:string
  
  @ManyToMany(type=>Project,(project)=>project.users)
  projects:Project[]

}
