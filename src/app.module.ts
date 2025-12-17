import { Module } from '@nestjs/common';

import { RouterModule, Routes } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
const route: Routes = [{ path: 'users', module: UsersModule }];
@Module({
  imports: [
    RouterModule.register(route),
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DB_HOST,
        entities: ['src/**/*.entity.ts'],
        migrations: ['src/database/migrations/*.migration.ts'],
        synchronize: false,
        logging: ['error', 'query'],
      }),
    }),
  ],
})
export class AppModule {}
