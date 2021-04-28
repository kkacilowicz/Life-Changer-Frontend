import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdSportComponent } from './ed-sport.component';

describe('EdSportComponent', () => {
  let component: EdSportComponent;
  let fixture: ComponentFixture<EdSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdSportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
