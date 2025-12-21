import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

export interface Response<T> {
  success: boolean;
  data: T;
  message?: string;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        message: data?.message || this.getDefaultMessage(context),
      })),
    );
  }
    private getDefaultMessage(context: ExecutionContext): string {
    const method = context.switchToHttp().getRequest().method;
    const path = context.switchToHttp().getRequest().url;

    // پیام پیش‌فرض بر اساس متد
    const messages: Record<string, string> = {
      POST: 'Created successfully',
      PUT: 'Updated successfully',
      PATCH: 'Updated successfully',
      DELETE: 'Deleted successfully',
    };

    return messages[method] || 'Operation successful';
  }
}
