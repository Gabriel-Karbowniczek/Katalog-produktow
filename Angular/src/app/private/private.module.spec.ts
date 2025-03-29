import { PrivateModule } from './private.module';

describe('PrivateModule', () => {
  const module: PrivateModule = new PrivateModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
