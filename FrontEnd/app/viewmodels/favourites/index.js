define(['plugins/router', 'durandal/app', 'knockout', 'jquery'],
    function (router, app, ko, $) {
        var fav = {
            activate: activate,
            artists: ko.observableArray([]),
            releases: ko.observableArray([]),
            unFavourArtist: unFavourArtist,
            unFavourRelease: unFavourRelease,
            title: 'Favourites'
        };
        return fav;
        function activate() {
            fav.artists([]);
            fav.releases([]);
            var favReleases = localStorage.getItem('favouriteReleases');
            if (favReleases) {
                let favouriteR = JSON.parse(favReleases);
                ko.utils.arrayForEach(favouriteR, function (item) {
                    fav.releases.push(item);
                });
            }
            var favArtists = localStorage.getItem('favouriteArtists');
            if (favArtists) {
                let favouriteArt = JSON.parse(favArtists);
                ko.utils.arrayForEach(favouriteArt, function (item2) {
                    fav.artists.push(item2);
                });
            }
        }
        function unFavourArtist(data) {
            fav.artists.pop(data);
            let artistJS = ko.toJS(fav.artists());
            var dataToStore = JSON.stringify(artistJS);
            localStorage.setItem('favouriteReleases', dataToStore);
            toastr.success(data.title + ' removed from favourites artists');
        }
        function unFavourRelease(data) {
            fav.releases.pop(data);
            let releaseJS = ko.toJS(fav.releases());
            var dataToStore = JSON.stringify(releaseJS);
            localStorage.setItem('favouriteReleases', dataToStore);
            toastr.success(data.title + ' removed from favourites releases');
        }
    });