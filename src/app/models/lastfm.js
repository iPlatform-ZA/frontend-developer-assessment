import ko from 'knockout';
import { getArtists } from '../utils/lastfm-api';
import Artist from './artist';

class LastFm {
    constructor(){
        this.artists = ko.observableArray([]);
        this.selectedArtist = ko.observable(null);
    }


    searchArtist(artist){
        console.log('Artist', artist);
        getArtists(artist)
            .done((r) => {
                r.results.artistmatches.artist.forEach((element) => {
                 this.artists.push(new Artist(element));
                });
            });
    }
}; 

export default LastFm;

