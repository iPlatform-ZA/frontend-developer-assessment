import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { IArtist } from '../Model/iartist';
import { IRelease } from '../Model/irelease';
import { FavouritesEnum } from '../Model/FavouritesEnum';
import { IArtistInputs } from '../Model/iartistInputs'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  artistInputs: IArtistInputs;

  constructor(private localStorageService: LocalStorageService) {
   this.artistInputs = <IArtistInputs>{ 
    ShowReleaseInfo: true,
      artists:[],
      favouriteOptions: FavouritesEnum.Remove,
      showShortList: false
  };
  }

  ngOnInit() {
      console.log("[Enters] ngOnInit - FavouritesComponent");
      this.localStorageService.keys().forEach(item=>{
           let artist: IArtist = this.localStorageService.get(item) as IArtist;
           this.artistInputs.artists.push(artist);
      });
  }

  }
