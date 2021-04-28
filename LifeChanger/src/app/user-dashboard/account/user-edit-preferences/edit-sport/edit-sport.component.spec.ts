import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportComponent } from './edit-sport.component';

describe('EditSportComponent', () => {
  let component: EditSportComponent;
  let fixture: ComponentFixture<EditSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
