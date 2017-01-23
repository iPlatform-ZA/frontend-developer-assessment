/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MusicBrainzService } from './music-brainz.service';

describe('MusicBrainzService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MusicBrainzService]
    });
  });

  it('should ...', inject([MusicBrainzService], (service: MusicBrainzService) => {
    expect(service).toBeTruthy();
  }));
});
