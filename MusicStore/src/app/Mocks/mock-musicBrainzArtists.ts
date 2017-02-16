import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { IMusicBrainzArtists } from '../Model/IMusicBrainzArtists';
import { ARTISTS } from './mock-iartist';

export class mockMusicBrainzArtist implements IMusicBrainzArtists {
  created:any;
  count: number;
  offset: number;
  artists: IArtist[];

    constructor(){
      this.created='';
      this.artists = ARTISTS;
      this.offset = 0;
      this.count = 3;
  }

}