import { Injectable } from '@angular/core';

import { IArtist } from '../../Model/iartist';
import { IRelease } from '../../Model/irelease';
import { ARTISTS } from '../../Mocks/mock-iartist';

@Injectable()
export class LastfmService {
  artists: IArtist[];
  constructor() { 
    this.artists = [];
  }

  SearchForArtists(term:string): IArtist[]{
    console.log("[Enters] SearchForArtists method- lastfm.service");
    this.artists = ARTISTS;
    return this.artists.filter(c=>c.name.toLowerCase().includes(term.toLowerCase()));
  }

}
