import ko from 'knockout';
import 'knockout-postbox';
import templateMarkup from 'text!./lastfm.html';
import MusicBrainz from '../../app/models/musicbrainz';
import toastr from 'toastr';
import {remove, some} from 'lodash'; 
import Favourites from '../../app/utils/favourites'

class Lastfm {
    constructor(params) {
        this.musicBrainz = new MusicBrainz();
        this.searchParam = ko.observable(null);
        this.isLoading = ko.observable(false).subscribeTo('isFetching');
        this.shortList = ko.observableArray([]);
        this.artistFavourites = Favourites.getFavourites('artist');
    }

    search() {
        if (this.searchParam()){
            ko.postbox.publish('error', null);
            this.musicBrainz.artists([]);
            this.musicBrainz.searchArtist(this.searchParam());
        } else {
            toastr.error('Please supply a artist name');
            bootbox.alert('Please supply a artist to search for..')
        }
    }

    dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    }
}

$('body').on('click', '.addToShort', function(){
    let curr = ko.dataFor(this);
    let ctx = ko.contextFor(this);
    if (!curr.isSelected()) {
      curr.isSelected(true);
      curr.isFavourite(some(ctx.$parent.artistFavourites, curr));
      ctx.$parent.shortList.push(curr);
      toastr.success('Added to shortlist'); 
    } else {
      ctx.$parent.shortList.remove(curr);
      curr.isSelected(false);
      toastr.success('Artist removed from shortlist')
    }
});
    
    

export default { viewModel: Lastfm, template: templateMarkup };
