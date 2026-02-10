import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../enums/role.enum';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const dataSource = app.get(DataSource);

  console.log(
  'Registered entities:',
  dataSource.entityMetadatas.map(e => e.target),
);
  const userRepository = dataSource.getRepository(User);
  const projectRepository = dataSource.getRepository(Project);

  // --- USERS ---
  const admin = userRepository.create({
    name:'Sam',
    email: 'admin@test.com',
    password: await bcrypt.hash('password123', 10),
    role: UserRole.Admin,
  });

  const user = userRepository.create({
    name:"Jack",
    email: 'user@test.com',
    password: await bcrypt.hash('password123', 10),
    role: UserRole.Member,
  });

  await userRepository.save([admin, user]);

  // --- PROJECT ---
  const project = projectRepository.create({
    name: 'Seeded Project',
    budget: 50000,
    deadline: new Date('2026-03-01'),
    users: [admin, user],
  });

  await projectRepository.save(project);

  console.log('✅ Seeding completed');

  await app.close();
}

bootstrap();
