import { Component } from '@angular/core';
import { FavouritesService } from '../../services/favouritesService'

@Component({
  selector: 'my-app',
  templateUrl: './app/pages/home/home.html'
})
export class HomeComponent {
  constructor (favouritesService:FavouritesService) {  }

 }