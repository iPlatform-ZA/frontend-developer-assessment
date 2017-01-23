/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FavouriteArtistServiceService } from '../shared/favourite-artist-service.service';

describe('FavouriteArtistServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavouriteArtistServiceService]
    });
  });

  it('should ...', inject([FavouriteArtistServiceService], (service: FavouriteArtistServiceService) => {
    expect(service).toBeTruthy();
  }));
});
