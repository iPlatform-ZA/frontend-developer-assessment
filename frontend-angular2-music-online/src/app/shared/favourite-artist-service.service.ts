import { Injectable } from '@angular/core';
import { FavouriteArtist } from './favourite-artist';

@Injectable()
export class FavouriteArtistService {

  favourites: FavouriteArtist[] = [];

  constructor() { }

  addFavourite(favourite: FavouriteArtist): FavouriteArtistService {
    this.favourites.push(favourite);
    console.log(favourite);
    return this;
  }

  getFavourites(): FavouriteArtist[] {
    return this.favourites;
  }

  deleteFavourite(favourite: FavouriteArtist): FavouriteArtistService {
    console.log('deleting...');
    for (var i = this.favourites.length ; i--;) {
      if (this.favourites[i].artistName === favourite.artistName) 
        this.favourites.splice(i, 1);
    }
    // this.favourites = this.favourites
    //   .filter(fav => fav.artistName !== favourite.artistName);
    return this;
  }

}
