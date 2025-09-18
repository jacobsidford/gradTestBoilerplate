import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Dev-only endpoint to simulate login and obtain a JWT for local testing
  @Post('dev-login')
  async devLogin(@Body() body: { email: string }) {
    const token = await this.authService.signDevToken(body.email);
    return { accessToken: token };
  }
}
