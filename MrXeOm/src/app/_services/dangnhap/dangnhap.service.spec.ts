import { TestBed, inject } from '@angular/core/testing';

import { DangNhapService } from './dangnhap.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DangNhapService]
    });
  });

  it('should be created', inject([DangNhapService], (service: DangNhapService) => {
    expect(service).toBeTruthy();
  }));
});