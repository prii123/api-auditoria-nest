import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.use(json({ limit: '60mb' }));

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Auditoria')
    // .setDescription('Esta es la Api de TributaCol')
    .setVersion('1.0')
    // .addTag('tributaria')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(4000);
}
bootstrap();
