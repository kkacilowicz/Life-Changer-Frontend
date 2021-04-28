import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPreferencesComponent } from './user-edit-preferences.component';

describe('UserEditPreferencesComponent', () => {
  let component: UserEditPreferencesComponent;
  let fixture: ComponentFixture<UserEditPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
