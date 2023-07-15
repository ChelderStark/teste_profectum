import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AppError } from '../app.error';

@Catch(Error)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = exception?.code ?? HttpStatus.BAD_REQUEST;

    switch (exception.code) {
      case 401: {
        response.status(status).json({
          status: exception.code,
          timestamp: new Date().toISOString(),
          message: exception.message,
          path: request.url,
        });
        break;
      }

      case 404: {
        response.status(status).json({
          status: exception.code,
          timestamp: new Date().toISOString(),
          message: exception.message,
          path: request.url,
        });
        break;
      }

      default:
        const payload = {
          status: status,
          message: exception.message,
          timestamp: new Date().toISOString(),
          path: request.url,
        };

        if (exception instanceof HttpException) {
          const error = exception.getResponse() as any;

          payload.message = error.message;
          status = exception.getStatus();
        }

        response.status(status).send(payload);
    }
  }
}
