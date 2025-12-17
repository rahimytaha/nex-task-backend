import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('nexTask document')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const app = await NestFactory.create(AppModule);
  const documenntFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documenntFactory);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
