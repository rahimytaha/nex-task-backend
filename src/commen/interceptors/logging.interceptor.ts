import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    const ip = request.ip || request.connection?.remoteAddress;
    this.logger.log(
      `${method} ${url} - IP: ${ip} - Body: ${JSON.stringify(request.body)} - Query: ${JSON.stringify(request.query)}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          const responseTime = Date.now() - now;
          this.logger.log(
            `${method} ${url} - ${context.getClass().name}.${context.getHandler().name} - Response time: ${responseTime}ms - Status: SUCCESS`,
          );
        },
        error: (err) => {
          const responseTime = Date.now() - now;
          this.logger.error(
            `${method} ${url} - ${context.getClass().name}.${context.getHandler().name} - Response time: ${responseTime}ms - Error: ${err.message}`,
            err.stack,
          );
        },
      }),
    );
  }
}