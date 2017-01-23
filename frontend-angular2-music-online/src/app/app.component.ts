import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  lastFmImageUrl: string = '../app/images/last-fm-icon.png';
  favoritesImageUrl: string = '../app/images/favorites-icon.png';
}
