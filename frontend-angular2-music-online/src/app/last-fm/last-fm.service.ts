import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LastFmShortlist } from './last-fm-shortlist';

@Injectable()
export class LastFmService {
  // http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=mapfumo&api_key=a6fd330d6f2521615327a8d8d92dcd75&format=json
  constructor(protected http: Http) {}
  
  shortlist: LastFmShortlist[] = [];

  addShortlist(shortlist:LastFmShortlist): LastFmService {
    this.shortlist.push(shortlist);
    console.log(shortlist);
    return this;
  }

  getShortlist(): LastFmShortlist[] {
    return this.shortlist;
  }

  getArtists(artist: string) {
    var params = new URLSearchParams()
    params.set('method', 'artist.search');
    params.set('artist', artist);
    params.set('api_key', 'a6fd330d6f2521615327a8d8d92dcd75');
    params.set('format', 'json');
    return this.http.get('http://ws.audioscrobbler.com/2.0', { search: params }).map(res => res.json())
  }

}
