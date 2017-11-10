import ko from 'knockout';
import templateMarkup from 'text!./favourites.html';
import _Favourites from '../../app/utils/favourites';
import { uniqBy, concat, filter, find } from 'lodash';
import toastr from 'toastr';

class Favourites {
    constructor(params) {
        this.releaseFavourites = _Favourites.getFavourites('release');
        this.artistFavourites= _Favourites.getFavourites('artist');
        this.allArtists = ko.observableArray([]);
        this.setArtist()
    }
    
    dispose() {
        // This runs when the component is torn down. Put here any logic necessary to clean up,
        // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
    }

    setArtist() {
        const releaseArtists = this.releaseFavourites.map((i) => {
            return Object.assign({hasReleases: false}, i['artist-credit'][0].artist) ;
        });
        const astists = this.artistFavourites.map((i) => {
            return { name: i.name, id: i.mbid, hasReleases: false }
        });
        const final = uniqBy(concat(releaseArtists, astists), 'name');
        final.forEach((v) => {
            const releases = filter(this.releaseFavourites, (i) => {
              return i['artist-credit'][0].artist.id === v.id;
            });
            v.releases = ko.observableArray(releases);
            v.isReleaseArtist = ko.observable(true);
            v.isOpen = ko.observable(false);
            this.allArtists.push(v); 
        });
        
    }
}

$('body').on('click', '.showRelease', function (){
    const curr = ko.dataFor(this);
    curr.isOpen() ?  curr.isOpen(false) : curr.isOpen(true);
});

$('body').on('click', '.removeRelease', function(){
    const curr = ko.dataFor(this);
    const ctx = ko.contextFor(this);
    _Favourites.remove(curr, 'release');
    ctx.$parent.releases.remove(curr);
    toastr.success('Favourite removed');
});

$('body').on('click', '.removeArtist', function(){
    const curr = ko.dataFor(this);
    const ctx = ko.contextFor(this);

    const artist = find(ctx.$parent.artistFavourites, (y) => {
        return y.mbid == curr.id;
    })
    _Favourites.remove(artist, 'artist');
    ctx.$parent.allArtists.remove(curr);
    toastr.success('Aritst removed from favourites');
});

export default { viewModel: Favourites, template: templateMarkup };
