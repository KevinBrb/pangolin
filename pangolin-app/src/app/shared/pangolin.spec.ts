import { TestBed } from '@angular/core/testing';

import { Pangolin } from './pangolin';

describe('UserService', () => {
  let service: Pangolin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pangolin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
