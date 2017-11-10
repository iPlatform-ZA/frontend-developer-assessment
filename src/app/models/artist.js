import ko from 'knockout';
import 'knockout-postbox';
import { getReleases } from '../utils/data-retrieval';
import Release from './release';
import Favourites from '../utils/favourites';
import { some } from 'lodash';
import toastr from 'toastr';

class Artist {
    constructor(artist, isFav = true){
        this.name = artist.name;
        this.url = artist.url;
        this.mbid = artist.mbid;
        this.images = artist.image;
        this.img = artist.image.length > 0 ? artist.image[1]['#text'] : '#'
        this.releases = ko.observableArray([]);
        this.isFavourite = ko.observable(isFav);
        this.isOpen = ko.observable(false);
        this.releaseFavourites = Favourites.getFavourites('release');
        this.artist = artist;
        this.isSelected = ko.observable(false);
    }

    getReleases(){
     if (this.releases().length == 0) {
        ko.postbox.publish('isFetching', true); 
        ko.postbox.publish('error', null);
        getReleases(this.mbid)
            .done((r) => {
                r.releases.forEach((a) => {
                    this.releases.push(new Release(a, some(this.releaseFavourites, a)));
                });
            })
            .fail((e) => {
                ko.postbox.publish('error', e);
                this.isOpen(false);
            });
        this.isOpen(true);
        ko.postbox.publish('isFetching', false); 
     } else {
        this.isOpen() ? this.isOpen(false) : this.isOpen(true);
     }
    }

    favourite() {
        if (!this.isFavourite()) {
            Favourites.saveFavourite(this.artist, 'artist');
            toastr.success('Favourite added');
        } else {
            Favourites.remove(this.artist, 'artist');
            toastr.success('Favourite removed');
        }
        this.isFavourite() ? this.isFavourite(false) : this.isFavourite(true);
    }

}


export default Artist;