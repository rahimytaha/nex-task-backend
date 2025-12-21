import { Injectable, LoggerService } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './winston.config';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger = WinstonModule.createLogger(winstonConfig);

  log(message: string, context?: string) {
    this.logger.log('info', message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }
}