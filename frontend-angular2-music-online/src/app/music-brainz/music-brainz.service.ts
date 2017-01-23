import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class MusicBrainzService {

  constructor(protected http: Http) { }

  getArtists(artist: string) {
    // http://musicbrainz.org/ws/2/artist/?query=artist:jackson five%inc=releases&fmt=json
    // http://www.musicbrainz.org/ws/2/recording/?query=artist:jackson five&fmt=json
    // http://www.musicbrainz.org/ws/2/recording/?query=artist:jackson%20five&fmt=json
    var url = 'http://musicbrainz.org/ws/2/recording/?query=artist:' + artist + '&fmt=json';
    var params = new URLSearchParams()
    params.set('query', 'artist:'+ artist);
    // params.set('inc', 'releases');
    params.set('fmt', 'json');
    return this.http.get(url).map(res => res.json())
  }


}
