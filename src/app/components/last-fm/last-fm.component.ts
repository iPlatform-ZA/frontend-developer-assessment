import { Component, OnInit } from '@angular/core';
import { LastfmService } from '../../services/lastfm.service';
import {LastFmArtistModel} from '../../LastFmArtistModel';

import { LocalStorageService } from 'angular-2-local-storage';

import {isBoolean} from "util";
import {isNumber} from "util";
import {jsonpFactory} from "@angular/http/src/http_module";

@Component({
  selector: 'app-last-fm',
  templateUrl: './last-fm.component.html'
})

export class LastFmComponent implements OnInit {
  searchStr:string;
  searchRes:LastFmArtistModel[];
  jsonObj ='';
  shortListedList:LastFmArtistModel[];
  shortlistVisible: boolean;
  favList:LastFmArtistModel[];
  favListString:string;
  KEY_STR:string = "favourates";
  showAlertMessage:string;

  constructor(private _lastFmService:LastfmService, private _storageService: LocalStorageService) {
    this.shortListedList = [];
    this.initFavourites();
    this.shortlistVisible = false;
    this.showAlertMessage = "";

  }

   searchMusic()
   {
     this._lastFmService.searchArtist(this.searchStr).subscribe( res =>
     {

       this.searchRes = res.results.artistmatches.artist;

     });
   }

   shortListItem($event)
   {

      var target = $event.target || event.srcElement || event.currentTarget;
      //var value = idAttr.nodeValue;
      var _id =  target.attributes['data-artist-id']['textContent'];
      var _name =  target.attributes['data-artist-name']['textContent'];

       var _artist = new LastFmArtistModel();
       _artist.image = [];
       _artist.name = _name;
       _artist.mbid =_id;

       if(this.shortListedList.length == 0)
       {
         this.shortListedList.push(_artist);
         this.displayMessage("Artist added to your short-list ");
       }else
       {
         var _canAdd:number = this.shortListedList.findIndex(x => x.mbid == _id);
         if(_canAdd < 0)
         {
           this.shortListedList.push(_artist);
           this.displayMessage("Artist added to your short-list ");
         }
       }
   }
  showShortList()
  {
    if(!this.shortlistVisible)
      this.shortlistVisible = true;
  }
  hideShortList()
  {
    this.shortlistVisible = false;
  }

  addToFav($event)
  {

    var target = $event.target || event.srcElement || event.currentTarget;
    //var value = idAttr.nodeValue;
    var _id =  target.attributes['data-artist-id']['textContent'];
    var _name =  target.attributes['data-artist-name']['textContent'];

    var _artist = new LastFmArtistModel();
    _artist.image = [];
    _artist.name = _name;
    _artist.mbid =_id;

    if(this.favList.length == 0)
    {
      this.favList.push(_artist);
      this.updateStorage();
      this.displayMessage("Artist added to your favorites ");
    }else
    {
      var _canAdd:number = this.favList.findIndex(x => x.mbid == _id);
      if(_canAdd < 0)
      {
        this.favList.push(_artist);
        this.displayMessage("Artist added to your favorites ");
        this.updateStorage();
      }
    }
  }

  removeFromFav(_id:string )
  {
    var _index :number = this.favList.findIndex(x => x.mbid == _id);
    if(_index >=0) {
      this.favList.splice(_index, 1);
      this.displayMessage("Artist removed to your favorites ");
      this.updateStorage();
    }

  }
  removeFromShortList(_id:string )
  {
    var _index :number = this.shortListedList.findIndex(x => x.mbid == _id);
    if(_index >=0)
      this.shortListedList.splice(_index,1);
  }

  updateStorage()
  {
    this.favListString = JSON.stringify(this.favList);
    this._storageService.set(this.KEY_STR, this.favListString);
  }

  initFavourites()
  {
    var _strFav:any = this._storageService.get(this.KEY_STR);
    this.favList = JSON.parse(_strFav);
  }

  displayMessage(_str:string)
  {
    this.showAlertMessage = _str;

  }
  ngOnInit() {
  }

}
