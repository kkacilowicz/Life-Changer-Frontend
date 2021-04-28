import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCultureComponent } from './edit-culture.component';

describe('EditCultureComponent', () => {
  let component: EditCultureComponent;
  let fixture: ComponentFixture<EditCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCultureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
