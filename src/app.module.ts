import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_INTERCEPTOR, RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ScheduleModule } from './schedule/schedule.module';
import { TaskModule } from './task/task.module';
import { LoggingInterceptor } from './commen/interceptors/logging.interceptor';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
const route: Routes = [
  { path: 'users', module: UsersModule },
  { path: 'auth', module: AuthModule },
  { path: 'schedule', module: ScheduleModule },
  { path: 'task', module: TaskModule },
];

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:join(__dirname,"..",'public')}),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'Tt9119573449',
        database: 'nextask',
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['src/database/migrations/*.ts'],
        synchronize: true,
        logging: true,
      }),
    }),
    RouterModule.register(route),
    UsersModule,
    AuthModule,
    TaskModule,
    ScheduleModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:LoggingInterceptor
    }
  ],
})
export class AppModule {}
