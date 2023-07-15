import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClienteExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const meta = exception.meta.target;

    switch (exception.code) {
      case 'P2001': {
        const status = HttpStatus.NOT_FOUND;
        response.status(status).json({
          status: status,
          timestamp: new Date().toISOString(),
          message: `The document in condition where does not exist`,
          path: request.url,
        });
        break;
      }

      case 'P2002': {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          status: status,
          timestamp: new Date().toISOString(),
          message: `A record with this ${meta} alredy exists.`,
          path: request.url,
        });
        break;
      }

      case 'P2003': {
        const status = HttpStatus.FORBIDDEN;
        response.status(status).json({
          status: status,
          timestamp: new Date().toISOString(),
          message: `Foreign key constraint failed on the field ${meta}`,
          path: request.url,
        });
        break;
      }

      case 'P2004': {
        const status = HttpStatus.FORBIDDEN;
        response.status(status).json({
          status: status,
          timestamp: new Date().toISOString(),
          message: `A constraint failed on the database: ${meta}`,
          path: request.url,
        });
        break;
      }

      case 'P2005': {
        const status = HttpStatus.NOT_ACCEPTABLE;
        response.status(status).json({
          status: status,
          timestamp: new Date().toISOString(),
          message: `The value of field value is invalid for the fields type: ${meta}`,
          path: request.url,
        });
        break;
      }

      default:
        super.catch(exception, host);
        break;
    }
  }
}
