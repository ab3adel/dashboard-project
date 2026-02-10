import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectPaginationQueryDto } from './dto/paginationQuery.dto';
import { AssignMemebersDto } from './dto/assign-memebrs.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Query() paginationQuery:ProjectPaginationQueryDto) {
    return this.projectsService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

 @Get('search')
search(
  @Query('name') name?: string,
  @Query('budget') budget?: number,
) {
  return this.projectsService.search(name, budget);
}

@Post('assign_member')
assignMemeber(@Body() assignMembersDto: AssignMemebersDto ) {

  return this.projectsService.assignMembers(assignMembersDto)
}

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
