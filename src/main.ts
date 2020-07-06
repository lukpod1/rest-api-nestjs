import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = 3000 || process.env.APP_PORT;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
