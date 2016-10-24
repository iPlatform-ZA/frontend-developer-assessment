/**
 * @module Route table
 */
define(function () {
    var routes = {
        lastfmArtistSearchUrl: "http://ws.audioscrobbler.com/2.0/?method=artist.search&api_key=9c200ecff951c1834e95e1de442625fe&format=json",
        brainzArtistSearchUrl: "http://musicbrainz.org/ws/2/artist/?query=artist:",
        brainzArtistReleaseUrl: "http://musicbrainz.org/ws/2/release?query=arid:",
        lastfmTopTracks: 'http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=9c200ecff951c1834e95e1de442625fe&format=json',
    }
    return routes;

});