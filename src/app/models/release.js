import ko from 'knockout';
import {has}  from 'lodash';
import Favourites from '../utils/favourites';
import toastr from 'toastr';

class Release {
    constructor(release, isFav = false){
        this.title = release.title;
        this.year = has(release, 'date') ? release.date.substring(0, 4) : '';
        this.label = release['label-info'].length > 0 ? 
            (has(release['label-info'][0].label, 'name') ? release['label-info'][0].label.name : '')  
            : '';
        this.trackCount = release.media[0]['track-count'];
        this.isFavourite = ko.observable(isFav);
        this.release = release;
    }

    favourite() {
        if (!this.isFavourite()) {
            Favourites.saveFavourite(this.release, 'release');
            toastr.success("Release added to favourite");
       } else {
           Favourites.remove(this.release, 'release');
            toastr.success("Release removed from favourite");
       }
        this.isFavourite() ? this.isFavourite(false) : this.isFavourite(true);
    }
}


export default Release;