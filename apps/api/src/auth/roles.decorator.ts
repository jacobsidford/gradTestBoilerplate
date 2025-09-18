import { SetMetadata } from '@nestjs/common';

export type Role = 'RECRUITER' | 'HIRING_MANAGER' | 'INTERVIEWER';
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
