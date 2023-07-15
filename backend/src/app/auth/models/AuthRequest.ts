import { ReturnUser } from '@core/domain/entities/users.entity';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: ReturnUser;
}
