import { Component, Inject } from '@angular/core';
import { Favourite } from '../../models/favouriteModel'
import { Artist } from '../../models/artistModel'
import { FavouritesService } from '../../services/favouritesService'

@Component({
  selector: 'my-app',
  templateUrl: './app/pages/favourites/favourites.html'
})
export class FavouritesComponent {
  private favourite: Favourite;
  public hasFavourites: boolean = false;

  constructor (private favouritesService:FavouritesService) { 
    this.favourite = favouritesService.getFavourite();
    this.hasFavourites = this.favourite.Artists.length > 0;
   }

   public removeFavourite(artist:Artist, release = null) { 
      this.favouritesService.removeFavourite(artist, release);
      this.hasFavourites = this.favourite.Artists.length > 0;
    }

    private showReleases(artist:Artist) {
      artist.$Hidden = !artist.$Hidden;
    }
 }