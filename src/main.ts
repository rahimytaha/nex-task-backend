import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './commen/logger/winston.config';
import { LoggingInterceptor } from './commen/interceptors/logging.interceptor';
import { ResponseInterceptor } from './commen/interceptors/response.interceptor';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('nexTask document')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const documenntFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documenntFactory);
  app.useGlobalInterceptors(new ResponseInterceptor)
  // app.useGlobalInterceptors(new LoggingInterceptor(AuthService));
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
