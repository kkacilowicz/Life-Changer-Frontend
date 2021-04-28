import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdCultureComponent } from './ed-culture.component';

describe('EdCultureComponent', () => {
  let component: EdCultureComponent;
  let fixture: ComponentFixture<EdCultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdCultureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdCultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
