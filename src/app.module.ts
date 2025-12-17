import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RouterModule, Routes } from '@nestjs/core';
const route: Routes = [{ path: 'users', module: UsersModule }];

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
  ],
})
export class AppModule {}