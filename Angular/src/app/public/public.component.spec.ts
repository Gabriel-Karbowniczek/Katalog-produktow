import { PublicComponent } from './public.component';

describe('PublicComponent', () => {
  let component: PublicComponent;

  beforeEach(() => {
    component = new PublicComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
