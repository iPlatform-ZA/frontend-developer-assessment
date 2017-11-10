import $ from 'jquery';
import { APIKEY, LASTFM_ROOT } from '../../config';

export function getArtists(artist) {
    const dfd = $.Deferred();
    $.getJSON(`${LASTFM_ROOT}?method=artist.search&artist=${artist}&api_key=${APIKEY}&format=json`, (r) => {
        dfd.resolve(r);
    });
    return dfd;
}


export function getReleases(mbid){
    const dfd = $.Deferred();
    $.getJSON(`${LASTFM_ROOT}?method=artist.gettopalbums&mbid=${mbid}&api_key=${APIKEY}&format=json`, (r) => {
        dfd.resolve(r);
    });
    return dfd;
}