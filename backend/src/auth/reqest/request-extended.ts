import { Request } from 'express';
import { User } from '@prisma/client';

export interface RequestExtended extends Request {
    user: User;
}
