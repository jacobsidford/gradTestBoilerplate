import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

import { PrismaService } from '../prisma/prisma.service';

export type JwtPayload = {
  sub: string;
  email: string;
  name: string;
  role: 'RECRUITER' | 'HIRING_MANAGER' | 'INTERVIEWER';
};

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signDevToken(email: string) {
    // For dev: look up user by email and sign a local JWT
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      role: (user.role as any) || 'RECRUITER',
    };
    const secret = process.env.JWT_SECRET || 'dev-secret';
    return jwt.sign(payload, secret, { expiresIn: '2h' });
  }
}
