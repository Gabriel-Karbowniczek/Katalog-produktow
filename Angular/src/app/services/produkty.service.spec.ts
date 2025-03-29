import { TestBed } from '@angular/core/testing';

import { ProduktyService } from './produkty.service';

describe('ProduktyService', () => {
  let service: ProduktyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduktyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
