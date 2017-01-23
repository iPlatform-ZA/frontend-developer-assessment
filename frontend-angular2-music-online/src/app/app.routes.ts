// ====== ./app/app.routes.ts ======

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicBrainzComponent } from './music-brainz/music-brainz.component';
import { LastFmComponent } from './last-fm/last-fm.component';
import { FavouritesComponent } from './favourites/favourites.component';

// Route Configuration
export const routes: Routes = [
    { path: '', redirectTo: '/musicbrainzroute', pathMatch: 'full' },
    { path: 'musicbrainzroute', component: MusicBrainzComponent },
    { path: 'lastfmroute', component: LastFmComponent },
    { path: 'favroute', component: FavouritesComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);