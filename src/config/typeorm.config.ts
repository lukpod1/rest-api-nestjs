require('dotenv').config();
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

export const typeOrmConfig: TypeOrmModule = {
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
}