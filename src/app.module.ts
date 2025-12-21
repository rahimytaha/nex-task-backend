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
import { ConfigModule, ConfigService } from '@nestjs/config';
const route: Routes = [
  { path: 'users', module: UsersModule },
  { path: 'auth', module: AuthModule },
  { path: 'schedule', module: ScheduleModule },
  { path: 'task', module: TaskModule },
];

@Module({
  imports: [
    ServeStaticModule.forRoot({rootPath:join(__dirname,"..",'public')}),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        autoLoadEntities: true,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: ['src/database/migrations/*.ts'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production', 
        logging: configService.get<string>('NODE_ENV') !== 'production',
        ssl: configService.get<boolean>('DB_SSL')
          ? {
              rejectUnauthorized: false, // برای Neon معمولاً کافیه
              channelBinding: configService.get<string>('DB_CHANNEL_BINDING'),
            }
          : false,
      }),
      inject: [ConfigService],
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
