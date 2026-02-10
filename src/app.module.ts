import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthenticaionModule } from './authentication/authentication.module';
import { AuthenticationGuard } from './authentication/guards/authentication/authentication.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ ProjectsModule 
           , TypeOrmModule.forRoot({
              type: 'postgres', 
              host: 'localhost', 
              port: 5432, 
              username: 'postgres',
              password: 'pass123', 
              database: 'postgres',
              autoLoadEntities: true, 
              synchronize: true, 
           }), UserModule ,
          AuthenticaionModule],
  controllers: [AppController],
  providers: [AppService , 
     {
          provide: APP_GUARD,
          useClass: AuthenticationGuard,
        },

  ],
})
export class AppModule {}
