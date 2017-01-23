FrontEndApplication.service('favouritesService', function (localStorageService, $filter) {

    var FavReleasesKey = "FavReleases";
    var FavArtistsKey = "FavArtists";

    var FavReleases = [];
    var FavArtists = [];
      
    function initialiseReleaseStorage() {

        if (!localStorageService.get(FavReleasesKey)) {

            localStorageService.set(FavReleasesKey, []);

        } else {

            FavReleases = localStorageService.get(FavReleasesKey)
        }

    }

    function initialiseArtistStorage() {
        
        if (!localStorageService.get(FavArtistsKey)) {

            localStorageService.set(FavArtistsKey, []);

        } else {

            FavArtists = localStorageService.get(FavArtistsKey)
        }
    }

    this.saveFavouriteArtist = function (artist) {

        initialiseArtistStorage();

        var exists = FavArtists.find(function (a) {
            return a.mbid === artist.mbid;
        });


        if (!exists) {
            
            FavArtists.push(artist);

            console.log(FavArtists.length);

            localStorageService.set(FavArtistsKey, FavArtists);
        }
    };

    this.saveFavouriteRelease = function (release) {

        initialiseReleaseStorage();

        var exists = FavReleases.find(function (r) {
            return r.id === release.id;
        });
        
        if (!exists) {

            FavReleases.push(release);

            console.log(FavReleases.length);

            localStorageService.set(FavReleasesKey, FavReleases);
        }
    };

    this.getFavouriteReleases = function () {

        initialiseReleaseStorage();

        return FavReleases;

    };


    this.getFavouriteArtists = function () {

        initialiseArtistStorage();

        return FavArtists;

    };


   this.removeFavouriteArtist = function (artist) {

       initialiseArtistStorage();

       var index = FavArtists.indexOf(artist);

       FavArtists.splice(index, 1);

       localStorageService.set(FavArtistsKey, FavArtists);

       return FavArtists;

   };

   this.removeFavouriteRelease = function (release) {

        initialiseReleaseStorage();

        var index = FavReleases.indexOf(release);

        FavReleases.splice(index, 1);

        localStorageService.set(FavReleasesKey, FavReleases);

        return FavReleases;
    };


});