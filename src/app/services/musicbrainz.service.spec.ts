/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MusicbrainzService } from './musicbrainz.service';

describe('MusicbrainzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicbrainzService]
    });
  });

  it('should ...', inject([MusicbrainzService], (service: MusicbrainzService) => {
    expect(service).toBeTruthy();
  }));
});
