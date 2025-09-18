import { Reflector } from '@nestjs/core';

import { RolesGuard } from '../src/auth/roles.guard';

describe('RolesGuard', () => {
  function createContext(role?: string) {
    return {
      switchToHttp: () => ({ getRequest: () => ({ user: { role } }) }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as any;
  }

  it('allows when no roles required', () => {
    const reflector = new Reflector();
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(undefined as any);
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(createContext('RECRUITER'))).toBe(true);
  });

  it('denies when user missing', () => {
    const reflector = new Reflector();
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['RECRUITER']);
    const guard = new RolesGuard(reflector);
    const ctx = {
      switchToHttp: () => ({ getRequest: () => ({}) }),
      getHandler: () => ({}),
      getClass: () => ({}),
    } as any;
    expect(guard.canActivate(ctx)).toBe(false);
  });

  it('allows when role matches', () => {
    const reflector = new Reflector();
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['RECRUITER']);
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(createContext('RECRUITER'))).toBe(true);
  });

  it('denies when role does not match', () => {
    const reflector = new Reflector();
    jest
      .spyOn(reflector, 'getAllAndOverride')
      .mockReturnValue(['HIRING_MANAGER']);
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(createContext('RECRUITER'))).toBe(false);
  });
});
