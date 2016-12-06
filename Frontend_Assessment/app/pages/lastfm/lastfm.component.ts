import { Component, ViewChild } from '@angular/core';
import { LastFMService } from '../../services/lastfmService'
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FavouritesService } from '../../services/favouritesService'

import { Artist } from '../../models/artistModel'

import * as _ from "lodash";

@Component({
    selector: 'my-app',
    templateUrl: './app/pages/lastfm/lastfm.html',
    providers: [LastFMService]
})
export class LastFMComponent {
    constructor(private lastfmService: LastFMService, private favouritesService: FavouritesService) { }

    @ViewChild('loadingModal')
     modal: ModalComponent; 

    public artistData;
    public shortList: Artist[] = [];
    private showResults: boolean = false;

    public searchArtist: Function = (artistName) => {
        this.modal.open();
        this.lastfmService.artistSearch(artistName)
            .then(result => {
                var fav: Artist[] = this.favouritesService.getFavouriteArtists();
                _.forEach(fav, function (f) {
                    var favArtist = _.find(result, function (ad: Artist) { return ad.Identifier == f.Identifier });
                    if(favArtist != undefined)
                        favArtist.$favourited = true;
                });
                this.artistData = result;
                this.modal.dismiss();
                this.showResults = true;
            });
    }

    public maintainList(artist: Artist) {
        if (!artist.$added)
            this.shortList.push(artist);
        else
            _.remove(this.shortList, artist);

        artist.$added = !artist.$added;
    }

    public maintainFav(artist: Artist) {
        if (!artist.$favourited)
            this.favouritesService.addFavouriteArtist(artist);
        else
            this.favouritesService.removeFavourite(artist, null);

        artist.$favourited = !artist.$favourited;
    }
}