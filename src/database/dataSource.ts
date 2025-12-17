import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type:"postgres",
    url:"postgresql://neondb_owner:npg_cGvhe5OjD0El@ep-falling-haze-a86tveku-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
    entities:["src/**/*.entity.ts"],
    migrations:["src/database/migrations/*.migration.ts"],
    synchronize:false,
    logging:["error","query"]
})
export default AppDataSource 