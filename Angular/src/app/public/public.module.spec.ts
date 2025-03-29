import { PublicModule } from './public.module';

describe('PublicModule', () => {
  const module: PublicModule = new PublicModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
