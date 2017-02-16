import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { MusicBrainzComponent } from './music-brainz/music-brainz.component';
import { ArtistComponent } from './artist/artist.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LastFmComponent } from './last-fm/last-fm.component';
import { ArtistExistPipe } from './pipes/artist-exist.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MusicBrainzComponent,
    ArtistComponent,
    FavouritesComponent,
    LastFmComponent,
    ArtistExistPipe
  ],
  imports: [
    LocalStorageModule.withConfig({
            prefix: 'music-store',
            storageType: 'localStorage'
        }),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
