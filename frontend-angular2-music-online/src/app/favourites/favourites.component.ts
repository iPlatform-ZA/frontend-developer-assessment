import { Component, OnInit } from '@angular/core';
import { FavouriteArtistService } from '../shared/favourite-artist-service.service';
import { FavouriteArtist } from '../shared/favourite-artist';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(private favouriteArtistService : FavouriteArtistService) { }

  ngOnInit() {
    this.getFavourites();
  }
  
  favourites: FavouriteArtist[] = [];
  delFavImageUrl: string = '../app/images/delete-favorite-icon.png';

  getFavourites() {
    this.favourites =  this.favouriteArtistService.getFavourites();
  }

  removeFavourite(favourite) {
    console.log(favourite);
    this.favouriteArtistService.deleteFavourite(favourite);
  }

}
