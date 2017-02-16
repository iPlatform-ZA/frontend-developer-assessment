import { Component, OnInit } from '@angular/core';

import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { FavouritesEnum } from '../Model/FavouritesEnum';
import { IArtistInputs } from '../Model/iartistInputs'

import { MusicbrainzService } from '../service/MusicBrainz/musicbrainz.service';

@Component({
  selector: 'app-music-brainz',
  templateUrl: './music-brainz.component.html',
  styleUrls: ['./music-brainz.component.css'],
   providers: [MusicbrainzService ]
})
export class MusicBrainzComponent implements OnInit {
  SearchTerm: string;
  artistInputs: IArtistInputs;
  constructor(private musicbrainzService: MusicbrainzService) {
      console.log("enters MusicBrainzComponent constructor");
      this.SearchTerm = "";
      this.artistInputs = <IArtistInputs>{ 
         ShowReleaseInfo: true,
         artists:[],
         favouriteOptions: FavouritesEnum.Add,
         showShortList: false
      };
   }

  ngOnInit() {
  }

  Search(){
     console.log("[Enters] Search method - MusicBrainzComponent");

    this.musicbrainzService.SearchForArtist(this.SearchTerm).subscribe(
       data =>{ 
         this.artistInputs.artists = data.artists;
       },
       error =>{ console.log(error)}
    );

 }



}
