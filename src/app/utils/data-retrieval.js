import $ from 'jquery';
import { APIKEY, LASTFM_ROOT, MUSICBRAINZ_ROOT } from '../../config';

export function getArtists(artist) {
    const dfd = $.Deferred();
    $.getJSON(`${LASTFM_ROOT}?method=artist.search&artist=${artist}&api_key=${APIKEY}&format=json`, (r) => {
        dfd.resolve(r);
    });
    return dfd;
}


export function getReleases(mbid){
    const dfd = $.Deferred();
    $.getJSON(`${MUSICBRAINZ_ROOT}release?artist=${mbid}&inc=artist-credits+labels+discids+recordings&fmt=json`, (r, e) => {
        dfd.resolve(r);
    }).fail((e) => {
        dfd.reject('Could not retrieve artist releases : ', e.responseJSON.error);
    }) 
    return dfd.promise();
}