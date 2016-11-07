import { Injectable } from '@angular/core';
import { RestService } from './restService'
import { Artist } from '../models/artistModel'
import { Release } from '../models/releaseModel'
import { Favourite } from '../models/favouriteModel'

import * as _ from "lodash";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FavouritesService {
    private favourite: Favourite = new Favourite(); 

    public addFavouriteArtist(artist: Artist) {
        if (!_.some(this.favourite.Artists, function (x: Artist) { return x.Name == artist.Name || x.Identifier == artist.Identifier }))
            this.favourite.Artists.push(artist);
    }

    public addFavouriteRelease(artist: Artist, release: Release) {
        var art: Artist = _.find(this.favourite.Artists, function (x) { return x.Identifier == artist.Identifier || x.Name == artist.Name });
        debugger;
        if (art == undefined) {
            var favArtist = new Artist(artist.Identifier, artist.Name, artist.Url, artist.imageUrl);
            favArtist.Releases = [release];
            favArtist.$HasReleases = true;
            this.addFavouriteArtist(favArtist);
        } else {
            if (art.Releases == undefined)
                art.Releases = [];
            art.Releases.push(release);
        }
    }

    public removeFavourite(artist: Artist, release: Release) {
        if (release == null)
            _.remove(this.favourite.Artists, artist);
        else
            _.remove(_.find(this.favourite.Artists, function (f) { return f.Identifier == artist.Identifier || f.Name == artist.Name }).Releases, release);
    }

    public getFavourite() {
        return this.favourite;
    }

    public getFavouriteArtists() {
        return this.favourite.Artists;
    }

    public getFavouriteReleases(artist: Artist) {
        if (this.favourite.Artists.length > 0) {
            var release = _.find(this.favourite.Artists, function (x: Artist) { return x.Identifier == artist.Identifier });
            if (release == undefined) return [];
            return release.Releases;
        }
        else
            return [];
    }
}