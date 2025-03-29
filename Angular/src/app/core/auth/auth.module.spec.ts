import { AuthModule } from './auth.module';

describe('AuthModule', () => {
  const module: AuthModule = new AuthModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
