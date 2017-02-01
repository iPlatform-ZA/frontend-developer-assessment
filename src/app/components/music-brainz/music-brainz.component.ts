import { Component, OnInit } from '@angular/core';
import { MusicbrainzService } from '../../services/musicbrainz.service';
import {MusicBrainzArtistModel} from '../../MusicBrainzArtistModel';
import {ArtistAlbumModel} from '../../ArtistAlbumModel';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-music-brainz',
  templateUrl: './music-brainz.component.html',

})
export class MusicBrainzComponent implements OnInit {
  searchRes: MusicBrainzArtistModel[];
  artistAlbums: ArtistAlbumModel[];
  searchStr: string;
  activeArtist: string;
  constructor(private _musicBrainsService:MusicbrainzService)
  {
    this.activeArtist ="";
  }

  searchMusic()
  {
    this._musicBrainsService.searchArtist( this.searchStr).subscribe( res =>
    {
      this.searchRes = res.artists;
    });
  }
  showReleases(_id)
  {
    this._musicBrainsService.getArtistAlbums( _id).subscribe( res =>
    {
      this.artistAlbums = res.releases;
      this.activeArtist = _id;
      /*
       var _temp:any[] = [];
       _temp =  res.releases;

       console.log(1111);
     for(var i in _temp)
     {
       console.log(2222);
        var _item = _temp[i];
        var _release:ArtistAlbumModel;
       if( _item["release-group"])
       {
         console.log(3333);
         if(_item["release-group"]["primary-type"] ==  "Album")
         {
           console.log(4444 );


           //_release.id = _item["id"];

           _release.title = (_item.title) ?  _item.title : "";
           _release.date = (_item.date) ? _item.date : "";
           _release.tracks = (_item['track-count']) ? _item['track-count'] : "";
           _release.label = "";

           console.log("aaaaaaaaaaa");

           if(_item["release-info"])
           {
             console.log(5555);
             if(_item["release-info"][0]["label"])
             {
               console.log(6666);
               _release.label = _item["release-info"][0]["label"]["name"];
             }

           }
           console.log(77777);
           this.artistAlbums.push(_release);
         }
       }
     }*/


    });

  }

  ngOnInit() {
  }

}
