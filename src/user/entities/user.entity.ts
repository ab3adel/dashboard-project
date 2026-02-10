
import { Project } from "../../projects/entities/project.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../../enums/role.enum";

@Entity()
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
