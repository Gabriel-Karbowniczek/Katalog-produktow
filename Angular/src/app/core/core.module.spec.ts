import { CoreModule } from './core.module';

describe('CoreModule', () => {
  const module: CoreModule = new CoreModule();

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
