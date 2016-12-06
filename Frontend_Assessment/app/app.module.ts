import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

import { HomeComponent }   from './pages/home/home.component';
import { MusicBrainzComponent } from './pages/musicbrainz/musicbrainz.component'
import { LastFMComponent } from './pages/lastfm/lastfm.component'
import { FavouritesComponent } from './pages/favourites/favourites.component'

import { RestService } from './services/restService'
import { FavouritesService } from './services/favouritesService'

import { SearchComponent } from './controls/search.control'

@NgModule({
  imports:      
  [ 
      BrowserModule,
      HttpModule,
      FormsModule,
      Ng2Bs3ModalModule,
      RouterModule.forRoot([
      {
          path: 'musicbrainz',
          component: MusicBrainzComponent
      },
      {
          path: 'lastfm',
          component: LastFMComponent
      },
      {
          path: 'favourites',
          component: FavouritesComponent
      },
      { path: '', component: MusicBrainzComponent }
    ])
  ],
  providers: 
  [
      RestService, 
      FavouritesService
  ],
  declarations: 
  [ 
      HomeComponent, 
      MusicBrainzComponent,
      LastFMComponent,
      FavouritesComponent,
      SearchComponent
  ],
  bootstrap: [ HomeComponent ],
  
})

export class AppModule { }