import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduktyAddEditComponent } from './produkty-add-edit.component';

describe('ProduktyAddEditComponent', () => {
  let component: ProduktyAddEditComponent;
  let fixture: ComponentFixture<ProduktyAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduktyAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduktyAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
