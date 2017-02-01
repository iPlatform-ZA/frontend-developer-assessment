import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { LastFmComponent } from './components/last-fm/last-fm.component';
import { MusicBrainzComponent } from './components/music-brainz/music-brainz.component';

import { LastfmService } from './services/lastfm.service';
import { MusicbrainzService } from './services/musicbrainz.service';

import { LocalStorageModule } from 'angular-2-local-storage';


import {routing} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FavouritesComponent,
    LastFmComponent,
    MusicBrainzComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, routing,
    LocalStorageModule.withConfig({
      prefix: 'sox-app',
      storageType: 'localStorage'
    })
  ],
  providers: [LastfmService, MusicbrainzService],
  bootstrap: [AppComponent]
})
export class AppModule { }
