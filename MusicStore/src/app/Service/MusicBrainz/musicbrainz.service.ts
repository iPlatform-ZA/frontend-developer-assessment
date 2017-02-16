import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { IMusicBrainzArtists } from '../../Model/IMusicBrainzArtists';
import { IMusicBrainzArtistReleases } from '../../Model/iMusicBrainzArtistReleases';
import { IMusicbrainzService } from '../../Model/IMusicbrainzService'

import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MusicbrainzService implements IMusicbrainzService{
  baseUrl:string;
  constructor(private http: Http) {
    this.baseUrl = 'http://musicbrainz.org/ws/2/';
   }

   SearchForArtist(term:string) : Observable<IMusicBrainzArtists>{
     console.log("[Enters] SearchForArtist method");
     let method:string = 'artist/?query=artist:'+term+'&fmt=json';
     return this.http.get(this.baseUrl+method)
                        // ...and calling .json() on the response to return data
                         .map(res => res.json() as IMusicBrainzArtists)
                         //...errors if an
                         .catch(this.handleError);
   }


    GetArtistReleases(id:string) : Observable<IMusicBrainzArtistReleases>{
     console.log("[Enters] GetArtistReleases method");
     let method:string = 'release?artist='+id+'&inc=labels+media+artist-credits&fmt=json';
     return this.http.get(this.baseUrl+method)
                        // ...and calling .json() on the response to return data
                         .map(res => res.json() as IMusicBrainzArtistReleases)
                         //...errors if an
                         .catch(this.handleError);
   }



   private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
