import { Injectable } from '@angular/core';
import { RestService } from './restService'
import { Artist } from '../models/artistModel'
import { Release } from '../models/releaseModel'

import * as _ from "lodash";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class FavouritesService {
    private favourites: Artist[] = [];

    public addFavourite(artist: Artist, release: Release) {
        if (release == null)
            this.favourites.push(artist);
        else {
            if (_.some(this.favourites, function (x) { return x.Identifier == artist.Identifier })) {
                _.find(this.favourites, function (f) { return f.Identifier == artist.Identifier }).Releases.push(release);
            } else {
                var favArtist = new Artist(artist.Identifier, artist.Name, artist.Url, artist.imageUrl);
                favArtist.Releases = [release];
                favArtist.$HasReleases = true;
                this.favourites.push(favArtist);
            }
        }
    }

    public removeFavourite(artist: Artist, release: Release) {
        if (release == null)
            _.remove(this.favourites, artist);
        else
            _.remove(_.find(this.favourites, function (f) { return f.Identifier == artist.Identifier }).Releases, release);
    }

    public getFavourites() {
        return this.favourites;
    }

    public getFavouriteReleases(artist: Artist) {
        if (this.favourites.length > 0) {
            var release = _.find(this.favourites, function (x: Artist) { return x.Identifier == artist.Identifier });
            if (release == undefined) return [];
            return release.Releases;
        }
        else
            return [];
    }
}