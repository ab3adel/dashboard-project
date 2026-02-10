import { Controller, Get, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserPaginationQueryDto } from './dto/paginationQuery.dto';
import { Roles } from '../authorization/decorators/roles.decorator';
import { UserRole } from '../enums/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.Admin)
  @Get()
  findAll(@Query() paginationQuery:UserPaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }
  @Roles(UserRole.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
