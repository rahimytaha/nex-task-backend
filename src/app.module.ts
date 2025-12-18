import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ScheduleModule } from './schedule/schedule.module';
const route: Routes = [
  { path: 'users', module: UsersModule },
  { path: 'auth', module: AuthModule },
  { path: 'schedule', module: ScheduleModule },
];

@Module({
  imports: [
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
    ScheduleModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
