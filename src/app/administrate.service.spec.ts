import { TestBed } from '@angular/core/testing';

import { AdministrateService } from './administrate.service';

describe('AdministrateService', () => {
  let service: AdministrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
