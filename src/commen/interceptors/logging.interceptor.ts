import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  constructor(private authService: AuthService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const method = request.method;
    const url = request.url;
    const now = Date.now();
    const ip = request.ip || request.connection?.remoteAddress;
    const token = request.headers?.authorization
    this.logger.log(
      `${method} ${url} - IP: ${ip} - Body: ${JSON.stringify(request.body)} - Query: ${JSON.stringify(request.query)} -Token ${token}`,
    );

    return next.handle().pipe(
      tap({
        next: (data) => {
          
          const responseTime = Date.now() - now;
          this.logger.log(
            `${method} ${url} - ${context.getClass().name}.${context.getHandler().name} - Response time: ${responseTime}ms -Token ${token} - Status: SUCCESS`);
        },
        error: (err) => {
          const responseTime = Date.now() - now;
          this.logger.error(
            `${method} ${url} - ${context.getClass().name}.${context.getHandler().name} - Response time: ${responseTime}ms -Token ${token} - Error: ${err.message}`,
            err.stack,
          );
        },
      }),
    );
  }
}