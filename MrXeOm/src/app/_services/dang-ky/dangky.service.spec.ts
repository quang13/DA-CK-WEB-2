import { TestBed, inject } from '@angular/core/testing';

import { DangKyService } from './dangky.service';

describe('RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DangKyService]
    });
  });

  it('should be created', inject([DangKyService], (service: DangKyService) => {
    expect(service).toBeTruthy();
  }));
});