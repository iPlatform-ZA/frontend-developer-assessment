import ko from 'knockout';
import { getArtists } from '../utils/data-retrieval';
import Artist from './artist';
import 'knockout-postbox';

class MusicBrainz {
    constructor(){
        this.artists = ko.observableArray([]);
        this.selectedArtist = ko.observable(null);
    }

    searchArtist(artist){
        ko.postbox.publish('isFetching', true); 
        getArtists(artist)
            .done((r) => {
                r.results.artistmatches.artist.forEach((element) => {
                 this.artists.push(new Artist(element));
                });
                ko.postbox.publish('isFetching', false); 
            })
            .fail((e) => {
                ko.postbox.publish('error', e); 
            });
    }
}; 

export default MusicBrainz;
