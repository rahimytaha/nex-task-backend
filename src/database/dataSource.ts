import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'Tt9119573449',
  database: 'nextask',
  entities: ['src/**/*.entity{.ts,.js}'],     
  migrations: ['src/database/migrations/*.ts'], 
  synchronize: true,       
  logging: true,
});

export default AppDataSource;