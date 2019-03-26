import { TestBed } from '@angular/core/testing';

import { NgMoonService } from './ng-moon.service';

describe('NgMoonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgMoonService = TestBed.get(NgMoonService);
    expect(service).toBeTruthy();
  });
});
