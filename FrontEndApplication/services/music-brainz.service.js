FrontEndApplication.service('musicBrainzService', function ($http, favouritesService) {

    this.getArtists = function (searchTerm) {

        var artistUrl = ''.concat('http://musicbrainz.org/ws/2/artist/?query=artist:', searchTerm, '&fmt=json');

        console.log(artistUrl);

        return $http({ url: artistUrl, method: 'GET' });
    };


    this.getReleases = function (artistId) {

        var releaseUrl = ''.concat('http://musicbrainz.org/ws/2/release/?query=arid:', artistId, '&fmt=json');

        console.log(releaseUrl);

        return $http({ url: releaseUrl, method: 'GET' });
    };


    this.saveReleaseAsFavourite = function (release) {

        favouritesService.saveFavouriteRelease(release);
    };


});
