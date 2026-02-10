import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { ProjectPaginationQueryDto } from './dto/paginationQuery.dto';
import { AssignMemebersDto, UpdateUserAssignment } from './dto/assign-memebrs.dto';
import { StatusEnum } from 'src/enums/projects.enums';
import { ActiveUserData } from 'src/authentication/interfaces/active-user-data.interface';
import { UserRole } from 'src/enums/role.enum';


@Injectable()
export class ProjectsService {

  constructor (
    @InjectRepository(Project)
    private readonly projectRepository :Repository<Project>,
    @InjectRepository(User)
    private readonly UserReposityory :Repository<User>
  ) {}

 async create(createProjectDto: CreateProjectDto) {
  let users;

  if (createProjectDto.users?.length) {
    users = await Promise.all(
      createProjectDto.users.map(id => this.preloadUsersById(id)),
    );
  }

  const project = this.projectRepository.create({
    ...createProjectDto,
    ...(users ? { users } : {}),
  });

  return this.projectRepository.save(project);
}

 findAll(paginationQuery: ProjectPaginationQueryDto) {
  const {
    status,
    deadlineFrom,
    deadlineTo,
    search,
    limit,
    offset,
  } = paginationQuery;

  const query = this.projectRepository
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.users', 'user')
    .skip(offset)
    .take(limit);

  if (status) {
    query.andWhere('project.status = :status', { status });
  }

  if (search) {
    query.andWhere(
      'LOWER(project.name) LIKE LOWER(:search)',
      { search: `%${search}%` },
    );
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

  async getStats(user : ActiveUserData) {
    if (user.role === UserRole.Admin){
    const [totalProjects, activeProjects, totalUsers] =
      await Promise.all([
        this.projectRepository.count(),
        this.projectRepository.count({
          where: { status: StatusEnum.Active },
        }),
        this.UserReposityory.count(),
      ]);

    return {
      totalProjects,
      activeProjects,
      totalUsers,
    };
  } 
   return this.projectRepository
    .createQueryBuilder('project')
    .leftJoin('project.users', 'user')
    .where('user.id = :userId', { userId: user.sub })
    .getMany();

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
        const query = this.projectRepository.createQueryBuilder('project');

        if (name) {
          query.andWhere('project.name = :name', { name });
        }

        if (budget !== undefined) {
          query.andWhere('project.budget = :budget', { budget });
        }

        return query.getMany();
     }
  

 async update(id: number, updateProjectDto: UpdateProjectDto) {
  const users =
    updateProjectDto.users &&
    (await this.UserReposityory.findBy({
      id: In(updateProjectDto.users),
    }));

  if (
    updateProjectDto.users &&
    users?.length !== updateProjectDto.users.length
  ) {
    throw new NotFoundException('One or more users not found');
  }

  const project = await this.projectRepository.preload({
    id,
    ...updateProjectDto,
    users,
  });

  if (!project) {
    throw new NotFoundException(`There is no project with id ${id}`);
  }

  return this.projectRepository.save(project);
}

 



  
async assignMembers(assignMembersDto: AssignMemebersDto) {
  const { project_id, users_ids } = assignMembersDto;
  if (!project_id) {
      throw new BadRequestException('You should provide project ');
  }
 

  const project = await this.projectRepository.findOne({
    where: { id: project_id },
    relations: { users: true },
  });

  if (!project) {
    throw new NotFoundException(`Project with id ${project_id} not found`);
  }
 if (users_ids.length >0) {
  const users = await this.UserReposityory.findBy({
    id: In(users_ids),
  });

  if (users.length !== users_ids.length) {
    throw new NotFoundException('One or more users not found');
  }

  project.users = users;
}
 else {
  project.users=[]
 }
  return this.projectRepository.save(project);
} 

  async removeUserFromProject( updateUserAssignment:UpdateUserAssignment) {
    const {id,user_id} = updateUserAssignment
    const project = await this.findOne(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const isAssigned = project.users.some(user => user.id === user_id);

    if (!isAssigned) {
      throw new BadRequestException(
        'User is not assigned to this project',
      );
    }

    project.users = project.users.filter(
      user => user.id !== user_id,
    );

    return this.projectRepository.save(project);
  }




  
  private async preloadUsersById(id: number): Promise<User> {
    const existingUser = await this.UserReposityory.findOne({ where: { id } }); 
    if (existingUser) {
      return existingUser;
    }
    throw new NotFoundException(`the user you are trying to find is not existed ${id}`)
  }

    async remove(id: number) {
    const project =await  this.findOne(id)
    return this.projectRepository.remove(project)

    
  }
}
