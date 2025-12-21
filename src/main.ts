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
    .setTitle('NexTask API')
    .setDescription(
      'Professional Task Management Backend API with authentication, checklists, and scheduling',
    )
    .setVersion('1.0')
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Schedule', 'Schedule management CRUD and advanced features')
    .addTag(
      'TaskBase',
      'TaskBase management CRUD for manage task for every day',
    )
    .addTag('TaskCheck', 'control tasks')
    .addTag('Users', 'User profile and crud')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  const documenntFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documenntFactory, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customCss: '.swagger-ui .topbar { background-color: #1a1a1a; }',
    customSiteTitle: 'NexTask API Docs',
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
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
