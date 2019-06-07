import { TestBed, inject } from '@angular/core/testing';

import { DangKyService } from '../dang-ky/dangky.service';

describe('EmployeeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DangKyService]
    });
  });

  it('should be created', inject([DangKyService], (service: DangKyService) => {
    expect(service).toBeTruthy();
  }));
});