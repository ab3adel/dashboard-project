import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundError } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { ProjectPaginationQueryDto } from './dto/paginationQuery.dto';


@Injectable()
export class ProjectsService {

  constructor (
    @InjectRepository(Project)
    private readonly projectRepository :Repository<Project>,
    @InjectRepository(User)
    private readonly UserReposityory :Repository<User>
  ) {}

 async create(createProjectDto: CreateProjectDto) {
    const users = await Promise.all(
      createProjectDto.users.map(id => this.preloadUsersById(id)),
    );
    
    const projects = this.projectRepository.create( {
       ...createProjectDto,
       users
     });
    return this.projectRepository.save(projects);
  }

  findAll(@Query() paginationQuery:ProjectPaginationQueryDto) {
    const { status, deadlineFrom, deadlineTo, limit, offset } = paginationQuery;

  const query = this.projectRepository
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.users', 'user')
    .skip(offset)
    .take(limit);

  if (status) {
    query.andWhere('project.status = :status', { status });
  }

  if (deadlineFrom) {
    query.andWhere('project.deadline >= :from', {
      from: new Date(deadlineFrom),
    });
  }

  if (deadlineTo) {
    query.andWhere('project.deadline <= :to', {
      to: new Date(deadlineTo),
    });
  }

  return query.getMany();
  }

  async findOne(id: number) {
   let project = await this.projectRepository.findOne({where:{id:+id}
                                                       ,relations:{users:true}})
   if (!project) {
    throw new NotFoundException(`The requested project was not found with id ${id}`)
   }
   return project
  }

  async search(name?: string, budget?:number) {
        if (!name && !budget) {
     return
    }
  
      const projects = await this.projectRepository.find({
      where: [
        ...(name ? [{ name }] : []),
        ...(budget ? [{ budget }] : []),
      ],
    });
  

  
    return projects;
     }
  

  async update(id: number, updateProjectDto: UpdateProjectDto) {
      const users =
      updateProjectDto.users &&
      (await Promise.all(
        updateProjectDto.users.map(id => this.preloadUsersById(id)),
      ));
    const project = this.projectRepository.preload({
      id:+id,
      ...updateProjectDto,
      users
    })
    if (!project) {
      throw new NotFoundException(`there is no project with id  ${id}`)
    }
  }

  async remove(id: number) {
    const project =await  this.findOne(id)
    return this.projectRepository.remove(project)

    
  }

  
  private async preloadUsersById(id: number): Promise<User> {
    const existingUser = await this.UserReposityory.findOne({ where: { id } }); 
    if (existingUser) {
      return existingUser;
    }
    throw new NotFoundException(`the user you are trying to find is not existed ${id}`)
  }
}
