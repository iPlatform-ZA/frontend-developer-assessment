import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LastfmService {
  searchUrl:string;
  apiKey:string;
  constructor(private _hhtp:Http) {
      this.apiKey= '12bae92b96c1e3a98b2940db158428a5';
     
     
   }
   ////http://www.last.fm/api/show/artist.search
   searchArtist(str:string)
   {
       this.searchUrl = "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist="+str+"&api_key="+this.apiKey+"&format=json";

       return this._hhtp.get(this.searchUrl)
        .map(res => res.json());
     
   }

}
