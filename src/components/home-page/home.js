import ko from 'knockout';
import 'knockout-postbox';
import homeTemplate from 'text!./home.html';
import MusicBrainz from '../../app/models/musicbrainz';
import bootbox from 'bootbox';
import toastr from 'toastr';


class HomeViewModel {
    constructor(route) {
        this.searchParam = ko.observable(null);
        this.hasResults = ko.observable(false);
        this.musicBrainz = new MusicBrainz();
        this.isLoading = ko.observable(false).subscribeTo('isFetching');
        this.error = ko.observable(null);

        ko.postbox.subscribe("error", (v) => {
            if (v){
                toastr.error(v);
                this.error(v);
            }
        }, this)
    }
    
    search(){
        if (this.searchParam()){
            ko.postbox.publish('error', null);
            this.musicBrainz.artists([]);
            this.musicBrainz.searchArtist(this.searchParam());
        } else {
            bootbox.alert('Please supply a artist to search for..')
        }
    }
}

export default { viewModel: HomeViewModel, template: homeTemplate };