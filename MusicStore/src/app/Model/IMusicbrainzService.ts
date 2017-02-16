import { IMusicBrainzArtists } from './IMusicBrainzArtists';
import { IMusicBrainzArtistReleases } from './iMusicBrainzArtistReleases';

import {Observable} from 'rxjs/Rx';



export interface IMusicbrainzService{
    baseUrl:string;
    SearchForArtist(term:string) : Observable<IMusicBrainzArtists>;
    GetArtistReleases(id:string) : Observable<IMusicBrainzArtistReleases>
}