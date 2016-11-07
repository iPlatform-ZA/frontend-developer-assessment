import { Component, ViewChild } from '@angular/core';
import { MusicBrainzService } from '../../services/musicbrainzService'
import { Artist } from '../../models/artistModel'
import { Release } from '../../models/releaseModel'
import { FavouritesService } from '../../services/favouritesService'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import * as _ from "lodash";

@Component({
    selector: 'my-app',
    templateUrl: './app/pages/musicbrainz/musicbrainz.html',
    providers: [MusicBrainzService]
})
export class MusicBrainzComponent {
    constructor(private musicBrainzService: MusicBrainzService, private favouritesService: FavouritesService) { }

    @ViewChild('loadingModal')
    modal: ModalComponent;

    public searchResults;
    private showResults: boolean = false;

    public searchArtist = (artistName) => {
        this.modal.open();
        this.musicBrainzService.getArtists(artistName)
            .then(result => {
                this.searchResults = result;
                this.modal.close();
                this.showResults = true;
            });
    }

    public getReleases(artist: Artist) {
        if (artist.$Hidden) {
            this.modal.open();
            this.musicBrainzService.getArtistReleases(artist.Identifier)
                .then(result => {
                    var artistData = _.find(this.searchResults, function (a: Artist) { return a.Identifier == artist.Identifier });

                    var fav: Release[] = this.favouritesService.getFavouriteReleases(artistData);
                    _.forEach(fav, function (f) {
                        var favRelease = _.find(result, function (ad: Release) { return ad.Identifier == f.Identifier });
                        if (favRelease != undefined)
                            favRelease.$favourited = true;
                    });

                    artistData.$HasReleases = result.length > 0;
                    artistData.Releases = result;
                    artistData.$Hidden = false;
                    this.modal.dismiss();
                });
        }
        else {
            artist.$Hidden = !artist.$Hidden;
            artist.Releases = [];
        }
    }

    public maintainFav(artist: Artist, release: Release) {
        release.$favourited = !release.$favourited;
        this.favouritesService.addFavouriteRelease(artist, release);
    }
}