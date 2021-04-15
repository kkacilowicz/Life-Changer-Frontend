import { TestBed } from '@angular/core/testing';

import { GoogleActionsService } from './google-actions.service';

describe('GoogleActionsService', () => {
  let service: GoogleActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
