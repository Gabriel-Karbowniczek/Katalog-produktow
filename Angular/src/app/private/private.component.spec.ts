import { PrivateComponent } from './private.component';

describe('PrivateComponent', () => {
  let component: PrivateComponent;

  beforeEach(() => {
    component = new PrivateComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
