import { TestBed } from '@angular/core/testing';

import { MenuClickService } from './menu-click.service';

describe('MenuClickService', () => {
  let service: MenuClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
