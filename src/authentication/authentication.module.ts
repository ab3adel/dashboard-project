import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';


import jwtConfig from './config/jwt.config';
import { BcryptService } from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    AccessTokenGuard,
    AuthenticationService,

  ],
  controllers: [
    AuthenticationController,

  ],
  exports:[
    AccessTokenGuard
  ]
})
export class AuthenticaionModule  {}