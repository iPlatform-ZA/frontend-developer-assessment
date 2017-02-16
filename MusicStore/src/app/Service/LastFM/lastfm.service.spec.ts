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

  it('should return artists when jakson passed as artist', inject([LastfmService], (service: LastfmService) => {
    expect(service.SearchForArtists('jackson').length).toBe(3);
  }));

  it('should return no artists when test passed as artist', inject([LastfmService], (service: LastfmService) => {
    expect(service.SearchForArtists('test').length).toBe(0);
  }));
});
