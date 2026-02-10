import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from '../common/dto/paginationQuery.dto';
import { UserPaginationQueryDto } from './dto/paginationQuery.dto';

@Injectable()
export class UserService {

  constructor ( 
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
) {}
  

   findAll(@Query() paginationQuery:UserPaginationQueryDto) {
      const{limit,offset,status } = paginationQuery
      return this.userRepository.find({
        where:status?{role:status}:{},
        
        skip:offset,
        take:limit
      })
    }

  async findOne(id: number) {
    let project = await this.userRepository.findOne({where:{id:+id}})
    if (!project) {
     throw new NotFoundException(`The requested project was not found with id ${id}`)
    }
    return project
   }

  async search(name?: string, email?:string) {
      if (!name && !email) {
    throw new BadRequestException('Provide name or email');
  }

    const users = await this.userRepository.find({
    where: [
      ...(name ? [{ name }] : []),
      ...(email ? [{ email }] : []),
    ],
  });

  if (users.length === 0) {
    throw new NotFoundException(
      `No user found with ${name ?? ''} ${email ?? ''}`.trim(),
    );
  }

  return users;
   }


  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
