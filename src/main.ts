import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './logger.config';
import { graphqlUploadExpress } from 'graphql-upload';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({ ...logger }),
    bodyParser: true,
  });

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    graphqlUploadExpress({ maxFileSize: 24 * 1024 * 1024 * 1024, maxFiles: 5 }),
  );

  const PORT = parseInt(process.env.PORT) || 3000;
  await app.listen(PORT).then(() => console.info(`Server started on ${PORT}`));
}
bootstrap();
