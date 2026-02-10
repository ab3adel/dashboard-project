import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectPaginationQueryDto } from './dto/paginationQuery.dto';
import { AssignMemebersDto, UpdateUserAssignment } from './dto/assign-memebrs.dto';
import { Roles } from '../authorization/decorators/roles.decorator';
import { UserRole } from '../enums/role.enum';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  
  @Roles(UserRole.Admin)
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }
  
  @Roles(UserRole.Admin)
  @Get()
  findAll(@Query() paginationQuery:ProjectPaginationQueryDto) {
    return this.projectsService.findAll(paginationQuery);
  }

  
@Roles(UserRole.Admin)
@Get('search')
search(
  @Query('name') name?: string,
  @Query('budget') budget?: string,
) {
  return this.projectsService.search(name, budget?Number(budget):undefined);
}


@Roles(UserRole.Admin)
@Post('assign-member')
assignMemeber(@Body() assignMembersDto: AssignMemebersDto ) {

  return this.projectsService.assignMembers(assignMembersDto)
}

@Roles(UserRole.Admin)
@Post('remove-member')
removeUserFromProject(@Body() assignMembersDto: UpdateUserAssignment ) {

  return this.projectsService.removeUserFromProject(assignMembersDto)
}

  
  @Roles(UserRole.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('triggered  findOne')
    return this.projectsService.findOne(+id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }
   
  @Roles(UserRole.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
