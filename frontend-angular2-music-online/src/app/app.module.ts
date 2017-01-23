import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MusicBrainzComponent } from './music-brainz/music-brainz.component';
import { LastFmComponent } from './last-fm/last-fm.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { LastFmService } from './last-fm/last-fm.service';
import { routing } from './app.routes';
import { LastFmShortlistComponent } from './last-fm-shortlist/last-fm-shortlist.component';
import { FavouriteArtistService } from './shared/favourite-artist-service.service';
import { MusicBrainzService } from './music-brainz/music-brainz.service';

@NgModule({
  declarations: [
    AppComponent,
    MusicBrainzComponent,
    LastFmComponent,
    FavouritesComponent,
    LastFmShortlistComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [LastFmService, FavouriteArtistService, MusicBrainzService],
  bootstrap: [AppComponent]
})
export class AppModule { }
