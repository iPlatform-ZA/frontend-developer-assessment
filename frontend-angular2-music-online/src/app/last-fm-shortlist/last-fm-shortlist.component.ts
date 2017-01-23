import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../last-fm/last-fm.service';
import { LastFmArtist } from '../last-fm/last-fm-artist';
import { LastFmShortlist } from '../last-fm/last-fm-shortlist';
import { FavouriteArtistService } from '../shared/favourite-artist-service.service';
import { FavouriteArtist } from '../shared/favourite-artist';

@Component({
  selector: 'app-last-fm-shortlist',
  templateUrl: './last-fm-shortlist.component.html',
  styleUrls: ['./last-fm-shortlist.component.css']
})
export class LastFmShortlistComponent implements OnInit {

  constructor(private lastFmService: LastFmService, private favouriteArtistService : FavouriteArtistService) { }
  shortlist: LastFmShortlist[] = [];
  ngOnInit() {
    this.getShortlist() ;
  }

  favImageUrl: string = '../app/images/favorites-icon-blue.png';

  getShortlist() {
    this.shortlist =  this.lastFmService.getShortlist();
  }

  addFavourite(favourite: FavouriteArtist){
    this.favouriteArtistService.addFavourite(favourite);
  }

}
