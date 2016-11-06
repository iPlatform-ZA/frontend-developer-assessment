import { Component, Inject } from '@angular/core';
import { Artist } from '../../models/artistModel'
import { FavouritesService } from '../../services/favouritesService'

@Component({
  selector: 'my-app',
  templateUrl: './app/pages/favourites/favourites.html'
})
export class FavouritesComponent {
  private favourites: Artist[];
  public hasFavourites: boolean = false;

  constructor (private favouritesService:FavouritesService) { 
    this.favourites = favouritesService.getFavourites();
    this.hasFavourites = this.favourites.length > 0;
   }

   removeFavourite : Function = (fav, rel = null) => { 
      this.favouritesService.removeFavourite(fav, rel);
      this.hasFavourites = this.favourites.length > 0;
    }

    private showReleases(favourite:Artist) {
      favourite.$Hidden = !favourite.$Hidden;
    }
 }