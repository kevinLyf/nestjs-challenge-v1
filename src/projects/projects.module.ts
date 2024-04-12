import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationMiddleware } from 'src/authentication/authentication.middleware';
import { TasksService } from 'src/tasks/tasks.service';
import { UsersModule } from 'src/users/users.module';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Project]),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService],
  exports: [TypeOrmModule.forFeature([Project])],
})
export class ProjectsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('projects');
  }
}
