import { TestBed, inject } from '@angular/core/testing';

import { EncryptService } from './encrypt.service';

describe('EncryptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptService]
    });
  });

  it('should ...', inject([EncryptService], (service: EncryptService) => {
    expect(service).toBeTruthy();
  }));
});
