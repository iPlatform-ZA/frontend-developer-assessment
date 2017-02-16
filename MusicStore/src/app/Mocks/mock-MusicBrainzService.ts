
import {IMusicbrainzService} from '../Model/IMusicbrainzService'

import { IMusicBrainzArtists } from '../Model/IMusicBrainzArtists';
import { IMusicBrainzArtistReleases } from '../Model/iMusicBrainzArtistReleases';
import {mockMusicBrainzArtist} from './mock-musicBrainzArtists';
import {mockMusicBrainzArtistReleases} from './mock-musicBrainzArtistReleases';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export class mockMusicbrainzService implements IMusicbrainzService{
  baseUrl:string;
    constructor(){
        this.baseUrl="";
    }

    SearchForArtist(term:string) : Observable<IMusicBrainzArtists>{
        console.log("SearchForArtist");
        let musicBrainzArtist: IMusicBrainzArtists=new mockMusicBrainzArtist();
        let list: IMusicBrainzArtists[]=new Array<IMusicBrainzArtists>();       
        list.push(musicBrainzArtist);
        console.log(list[0].artists.length);
        // return Observable.from(list)
        //                  .map(res=>res)
        //                  .catch(error=> error);
        return Observable<IMusicBrainzArtists>;

    }

    GetArtistReleases(id:string) : Observable<IMusicBrainzArtistReleases>{
        let musicBrainzArtistReleases: IMusicBrainzArtistReleases=new mockMusicBrainzArtistReleases();
        let list: IMusicBrainzArtistReleases[]=new Array<IMusicBrainzArtistReleases>();
        list.push(musicBrainzArtistReleases);
        return Observable.from(list)
                         .map(res=>res)
                         .catch(error=> error);
    }
}