import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdLoveComponent } from './ed-love.component';

describe('EdLoveComponent', () => {
  let component: EdLoveComponent;
  let fixture: ComponentFixture<EdLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdLoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EdLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
