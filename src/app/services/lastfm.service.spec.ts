/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LastfmService } from './lastfm.service';

describe('LastfmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LastfmService]
    });
  });

  it('should ...', inject([LastfmService], (service: LastfmService) => {
    expect(service).toBeTruthy();
  }));
});
