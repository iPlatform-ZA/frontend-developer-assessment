import { IArtist } from './iartist';
import { IRelease } from './irelease';

export interface IMusicBrainzArtists {
  created:any;
  count: number;
  offset: number;
  artists: IArtist[];
}