FrontEndApplication.service('lastfmService', function ($http, favouritesService) {

    this.getArtists = function (searchTerm) {

        var artistUrl = ''.concat('http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=', searchTerm ,'&api_key=6b7c98aba2b8f681ace7adced42925f2&format=json');

        console.log(artistUrl);

        return $http({ url: artistUrl, method: 'GET' });
    };
      
    this.saveAsFavourite= function(artist){
    
        favouritesService.saveFavouriteArtist(artist);
    };

});