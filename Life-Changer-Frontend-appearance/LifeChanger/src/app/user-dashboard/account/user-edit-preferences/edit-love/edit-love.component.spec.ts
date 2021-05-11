import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoveComponent } from './edit-love.component';

describe('EditLoveComponent', () => {
  let component: EditLoveComponent;
  let fixture: ComponentFixture<EditLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
