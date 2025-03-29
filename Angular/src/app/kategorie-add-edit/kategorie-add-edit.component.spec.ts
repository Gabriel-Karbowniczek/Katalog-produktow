import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KategorieAddEditComponent } from './kategorie-add-edit.component';

describe('KategorieAddEditComponent', () => {
  let component: KategorieAddEditComponent;
  let fixture: ComponentFixture<KategorieAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KategorieAddEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KategorieAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
