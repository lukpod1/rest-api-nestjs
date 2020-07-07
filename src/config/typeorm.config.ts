import 'dotenv/config';
import * as config from 'config';
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModule = {
    type: process.env.DB_CONNECTION || dbConfig.type,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
}