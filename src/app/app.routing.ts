import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { FavouritesComponent } from './components/favourites/favourites.component';
import { LastFmComponent } from './components/last-fm/last-fm.component';
import { MusicBrainzComponent } from './components/music-brainz/music-brainz.component';

const appRoutes: Routes = [
    {
        path:'',
        component:MusicBrainzComponent
    },
    {
        path:'last-fm',
        component:LastFmComponent
    },
    {
        path:'favourites',
        component:FavouritesComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);