import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

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
           }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
