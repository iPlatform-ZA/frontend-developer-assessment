import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';

import { MusicBrainzComponent } from './music-brainz/music-brainz.component';
import { ArtistComponent } from './artist/artist.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LastFmComponent } from './last-fm/last-fm.component';

const appRoutes: Routes = [
  { path: '',   component: MusicBrainzComponent , pathMatch: 'full' },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'lastfm', component: LastFmComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
