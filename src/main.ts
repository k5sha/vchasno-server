import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './logger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, logger);

  app.useGlobalPipes(new ValidationPipe());

  const PORT = parseInt(process.env.PORT) || 3000;
  await app.listen(PORT).then(() => console.info(`Server started on ${PORT}`));
}
bootstrap();
