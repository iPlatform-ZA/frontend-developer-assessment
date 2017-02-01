import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class MusicbrainzService {
  searchUrl:string;
  releaseUrl:string;
  apiKey:string;
  constructor(private _http:Http)
  {



  }

  searchArtist(str:string)
  {
    this.searchUrl = "http://musicbrainz.org/ws/2/artist/?query=artist:"+encodeURI(str)+"&fmt=json";



    return this._http.get(this.searchUrl)
      .map(res => res.json());
  }
  getArtistAlbums(id)
  {
    this.releaseUrl = "http://musicbrainz.org/ws/2/release/?query=arid:"+id+"&primarytype:album&fmt=json";
    return this._http.get(this.releaseUrl)
      .map(res => res.json());
  }



}
