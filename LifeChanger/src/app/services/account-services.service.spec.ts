import { TestBed } from '@angular/core/testing';

import { AccountServicesService } from './account-services.service';

describe('AccountServicesService', () => {
  let service: AccountServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
