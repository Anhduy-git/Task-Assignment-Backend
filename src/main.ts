import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //only use field list in dto
      transform: true,
    }),
  );
  await app.listen(config.get('PORT'));
}
bootstrap();
