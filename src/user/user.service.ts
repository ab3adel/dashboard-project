import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { UpdateUserDto, UpdateUserRoleDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserPaginationQueryDto } from './dto/paginationQuery.dto';

@Injectable()
export class UserService {

  constructor ( 
    @InjectRepository(User)
    private readonly userRepository:Repository<User>
) {}
  

   findAll(paginationQuery:UserPaginationQueryDto) {
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
    if (!id) {
      throw new BadRequestException('Provide user Id');
    }
     const user = await this.userRepository.preload({
      id:+id,
      ...updateUserDto
     })
     if (!user) {
          throw new NotFoundException('The user is not existed');
     }
   return await this.userRepository.save(user)
  }

  async updateRole (updateUesrRole:UpdateUserRoleDto) {
   const {id , role} = updateUesrRole
    if (!id ) {
      throw new BadRequestException('Provide user Id');
    }
    if (!role) {
      throw new BadRequestException('You should provide role ');
    }
     const user = await this.userRepository.preload({
  
      id
      ,role
     })
     if (!user) {
          throw new NotFoundException('The user is not existed');
     }
   return await this.userRepository.save(user)

  }

  
 


    async remove(id: number) {
    const user =await  this.findOne(id)
    return this.userRepository.remove(user)

    
  }
}
