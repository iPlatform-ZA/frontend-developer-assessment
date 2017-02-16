import { Component, OnInit } from '@angular/core';

import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { FavouritesEnum } from '../Model/FavouritesEnum';
import { IArtistInputs } from '../Model/iartistInputs';
import {LastfmService} from '../Service/LastFM/lastfm.service';

@Component({
  selector: 'app-last-fm',
  templateUrl: './last-fm.component.html',
  styleUrls: ['./last-fm.component.css'],
  providers: [LastfmService]
})
export class LastFmComponent implements OnInit {
   SearchTerm: string="";
   artistInputs: IArtistInputs;
  constructor(private lastfmService: LastfmService) { 
    this.SearchTerm = "";
    this.artistInputs = <IArtistInputs>{ 
         ShowReleaseInfo: false,
         artists:[],
         favouriteOptions: FavouritesEnum.None,
         showShortList: true
      };
  }

  ngOnInit() {

  }

  Search(): void{
     console.log("[Enters] Search method - last-fm.component");
     this.artistInputs.artists = this.lastfmService.SearchForArtists(this.SearchTerm);
  }
}
