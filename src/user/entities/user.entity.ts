
import { Project } from "src/projects/entities/project.entity";
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../../enums/role.enum";


export class User {

  @PrimaryGeneratedColumn()
  id:number

  @Column() 
  name:string  
  
  @Column({ unique: true })
  email:string

  @Column({select:false})
  password:string

  @Column({
    type:'enum',
    enum:UserRole,
    default:UserRole.Member
  })
   role :UserRole
  
  @ManyToMany(type=>Project,(project)=>project.users)
  projects:Project[]

}
