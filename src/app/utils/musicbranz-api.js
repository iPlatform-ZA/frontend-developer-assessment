import {MUSICBRAINZ_ROOT} from '../../config';

export function getArtist(){
    var dfd = $.Deffered();
    $.getJSON(`${MUSICBRAINZ_ROOT}`, (r) => {
    });
    return dfd.promise();
}

export function getReleases(){
    var dfd = $.Deffered();
    $.getJSON(`${MUSICBRAINZ_ROOT}`, (r) => {
    });
    return dfd.promise();
}